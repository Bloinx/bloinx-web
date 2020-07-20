pragma solidity >=0.4.22 <0.7.0;
pragma experimental ABIEncoderV2;

contract Groups {

    enum Stages {   //Stages of the round
        setup,      //receive the initial fees
        save,     //receive payments for stage number 1
        pay,      //send savings to user in 1rst number
        finished //all users Withdraw their saving
    }
    
    struct User {
        uint256 userId;
        string userName;
        address payable founds;
        bool fee;
        bool saveRound;
    }
    
    struct Room {
        uint256 roomId;
        User user;
    }
    
    mapping(address => User) public users;
    mapping(uint => Room) public rooms;
    uint roomCounter = 1;
    uint usersCounter = 0;
    uint feeSize;
    uint saveSize; //Monto de ahorro periodicamente
    uint groupSize;
    uint paymtCounterRound = 0;  //Cantidad de pagos que se realizan por stage
    uint ronda = 0;   //Sirve para saber el usuario en turno
    uint amount = saveSize * groupSize;  //Monto del ahorro logrado en la tanda

    Stages stage;

    User[] usersList;
    Room[] roomsList;

    address payable public admin;

    modifier isUsersTurn() {
        require(msg.sender == usersList[ronda].founds, "Debes esperar tu turno para retirar");
        _;
    }

    constructor(uint _fee, uint _saveAmt, uint8 _groupSize) public {
        admin = msg.sender;
        feeSize = _fee;
        saveSize = _saveAmt;
        groupSize = _groupSize;
        stage = Stages.setup;
    }

    function registerUser(string memory _userName) public {
        require(stage == Stages.setup, "La tanda ya comenzo y no acepta nuevos usuarios");
        if(usersCounter >= groupSize){
            revert("El grupo esta completo");  // ***?? diferencia con require(usersCounter >= groupSize, "El grupo esta completo");***
        }
        usersCounter ++;
        users[msg.sender] = User(usersCounter, _userName, msg.sender, false, false);
        usersList.push(users[msg.sender]);
    }

    function payFee() public payable {
        require(stage == Stages.setup, "Todos han pagado el fee exitosamente");
        require(msg.value >= feeSize, 'Fondos Insuficientes');
        admin.transfer(msg.value);
        users[msg.sender].fee = true;
        paymtCounterRound++;
        if (paymtCounterRound == groupSize){  // ***Aquí tenemos que cada usuario haya realizado solo un pago***
            paymtCounterRound = 0; // ***podemos cambiarlo iterando sobre el arreglo para ver que todos los .fee sean true, pero creo que es mas costoso***
            stage = Stages.save;
        }
    }


    function payRound() public payable {
        require(stage == Stages.save, "Espera una nueva ronda de ahorro");
        require(msg.value >= saveSize, 'Fondos Insuficientes');
        admin.transfer(msg.value);
        users[msg.sender].saveRound = true;
        paymtCounterRound ++;
        if (paymtCounterRound == groupSize){
            paymtCounterRound = 0;
            stage = Stages.pay;            //La tanda puede pagarse si todos ahorraron en la ronda
        }
    }
    
    function WithdrawRound() public isUsersTurn payable {
        require(stage == Stages.pay, "Espera a que tengamos el monto de tu ahorro");     //Se debe estar en fase de pago
        stage = Stages.save;
        usersList[ronda].founds.transfer(amount);
        ronda++;
        if(ronda > groupSize){
            stage = Stages.finished;
        }
    }

}