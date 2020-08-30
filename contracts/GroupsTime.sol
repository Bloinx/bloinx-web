pragma solidity >=0.4.22 <0.7.0;
pragma experimental ABIEncoderV2;

contract Groups {

    enum Stages {   //Stages of the round
        setup,      //register and receive the initial cash in
        save,     //receive payments
        //pay,      //withraw permited for the user assigned to the current period
        finished  //Cash in is sent to the users
    }

    struct User {   //Information from each user
        uint8 userId;
        string userName;
        address payable userAddr;
        bool cashInFlag;
        bool saveAmountFlag;
        bool current;   //defines if the user is participating in the current round
    }

    /*struct Room {
        uint8 roomId;
        User user;
    }*/

    mapping(address => User) public users;
    //mapping(uint => Room) public rooms;
    //uint roomCounter = 1;

    address payable public admin;   //The user that deploy the contract is the administrator

    //Constructor deployment variables
    uint cashIn;        //amount to be payed as commitment at the begining of the saving circle
    uint saveAmount; //Payment on each round/cycle
    uint groupSize; //Number of slots for users to participate on the saving circle

    //Counters and flags
    uint8 usersCounter = 0;
    uint CashInPayeesCount = 0;     //Comitment payments counter
    uint saveAmountPayeesCount = 0;  //Payments done in round counter
    uint cycle = 1;   //Current cycle/round in the saving circle
    uint public creationTime;
    uint public tandaTime;

    uint totalSaveAmount = 0;  //Collective saving on the round
    uint totalCashIn = 0;

    Stages public stage;

    address[] public addressOrderList;
    //Room[] roomsList;

    modifier isUsersTurn() {    //Verifies if it is the users round to widraw
        require(msg.sender == addressOrderList[cycle-1], "Debes esperar tu turno para retirar");
        _;
    }
    
    modifier isRegisteredUser() {    //Verifies if it is the users round to widraw
        require(users[msg.sender].current == true, "Usuario no registrado");
        _;
    }
    
    modifier stageSetupTime() {    //Verifies if it is the users round to widraw
        require(now <= creationTime + 2 minutes, 'Se termino el tiempo de registro');
        _;
    }
    
    modifier isPayAmountCorrect() {    //Verifies if it is the users round to widraw
        require(msg.value >= cashIn, 'Fondos Insuficientes');
        _;
    }
    
    //modifier timedTransitions() {
    //    if (stage == Stages.setup && now >= creationTime + 2 minutes)
    //        stage = Stages.save;
        //if (stage == Stages.save && now >= tandaTime + 3 minutes)
        //    Stages.finished;
        //if (stage == Stages.finished && now >= tandaTime + 4 minutes)
        //    nextStage();
    //    _;
    //}

    constructor(uint _cashIn, uint _saveAmount, uint8 _groupSize) public {
        admin = msg.sender;
        cashIn = _cashIn;
        saveAmount = _saveAmount;
        groupSize = _groupSize;
        stage = Stages.setup;
        tandaTime=now;
    }

    function registerUser(string memory _userName) public stageSetupTime {
        require(stage == Stages.setup, "La tanda ya comenzo y no acepta nuevos usuarios");  //The saving circle has started and doesn't accept new users
        require(usersCounter < groupSize, "El grupo esta completo");    //the saving circle is full
        usersCounter++;
        users[msg.sender] = User(usersCounter, _userName, msg.sender, false, false, true);
        addressOrderList.push(msg.sender);  //store user
    }

    function payCashIn() public stageSetupTime isRegisteredUser isPayAmountCorrect payable {       //Receive the comitment payment
        require(stage == Stages.setup, "Todos han pagado su entrada exitosamente");
        require(users[msg.sender].cashInFlag == false, "Ya tenemos regisrado tu CashIn"); //you have payed the cash in
        totalCashIn = totalCashIn + msg.value;
        users[msg.sender].cashInFlag = true;
        CashInPayeesCount++;
        if (CashInPayeesCount == groupSize){
            admin.transfer(totalCashIn);
            CashInPayeesCount = 0;
            //tandaTime=now;
            stage = Stages.save;
        }
    }


    function payRound() public isRegisteredUser isPayAmountCorrect payable {    //users make the payment for the cycle
        require(stage == Stages.save, "Espera una nueva ronda de ahorro");  //wait for a new round
        require(users[msg.sender].saveAmountFlag == false, "Ya ahorraste esta ronda");  //you have already saved this round
        require(now <= tandaTime + 1 minutes, 'Pago tardio');
        users[msg.sender].saveAmountFlag = true;
        saveAmountPayeesCount++;
        totalSaveAmount = totalSaveAmount + msg.value;
        if (saveAmountPayeesCount == groupSize){
            saveAmountPayeesCount = 0;
        }
    }

    function WithdrawRound() payable isRegisteredUser isUsersTurn public {   //User assigned to the round can widraw
        require(totalSaveAmount==groupSize*saveAmount, "Espera a que tengamos el monto de tu ahorro");     //Se debe estar en fase de pago
        address addressUserInTurn = addressOrderList[cycle-1];
        users[addressUserInTurn].userAddr.transfer(totalSaveAmount);
        cycle++;
        tandaTime=now;
        newRound();
        if(cycle > groupSize){
            stage = Stages.finished;

        }
    }


    function newRound() private{    //repeats the save and pay stages according to the saving circle size
        for(uint8 i = 0; i<groupSize; i++){
            address useraddress = addressOrderList[i];
            users[useraddress].saveAmountFlag = false;
        }
        totalSaveAmount = 0;
    }


    function withdrawCashIn() payable isPayAmountCorrect public {  //When all the rounds are done the admin sends the cash in to the users
        require(stage == Stages.finished, "Debes esperar a que termine el circulo de ahorro");//wait for the saving circle to end
        for(uint8 i = 0; i<groupSize; i++){
            address useraddress = addressOrderList[i];
            users[useraddress].cashInFlag = false;
            users[useraddress].current = false;
            users[useraddress].userAddr.transfer(cashIn);
        }
        totalCashIn=0;
        CashInPayeesCount = 0;
        usersCounter = 0;
        addressOrderList = new address[](0);
        stage = Stages.setup;
        totalSaveAmount = 0;
        cycle=1;
    }
}
