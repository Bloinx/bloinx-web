pragma solidity >=0.4.22 <0.7.0;
pragma experimental ABIEncoderV2;

contract Groups {

    enum Stages {   //Stages of the round
        setup,      //register and receive the initial cash in
        save,     //receive payments
        finished  //Cash in is sent to the users
    }

    struct User {   //Information from each user
        uint8 userId;
        address payable userAddr;
        bool cashInFlag;
        bool saveAmountFlag;
        bool currentRoundFlag;   //defines if the user is participating in the current round
        bool latePaymentFlag;
    }

    /*struct Room {
        uint8 roomId;
        User user;
    }*/

    mapping(address => User) public users;
    //mapping(uint => Room) public rooms;
    //uint roomCounter = 1;

    address payable admin;   //The user that deploy the contract is the administrator

    //Constructor deployment variables
    uint cashIn;        //amount to be payed as commitment at the begining of the saving circle
    uint saveAmount; //Payment on each round/cycle
    uint public groupSize; //Number of slots for users to participate on the saving circle

    //Counters and flags
    uint8 usersCounter = 0;
    uint CashInPayeesCount = 0;     //Comitment payments counter
    uint saveAmountPayeesCount = 0;  //Payments done in round counter
    uint public turn = 1;   //Current cycle/round in the saving circle
    uint creationTime;

    uint public totalSaveAmount = 0;  //Collective saving on the round
    uint public totalCashIn = 0;

    Stages public stage;

    address[] public addressOrderList;
    //Room[] roomsList;

    modifier isUsersTurn() {    //Verifies if it is the users round to widraw
        require(msg.sender == addressOrderList[turn-1], "Debes esperar tu turno para retirar");
        _;
    }
    
    modifier isRegisteredUser() {    //Verifies if it is the users round to widraw
        require(users[msg.sender].currentRoundFlag == true, "Usuario no registrado");
        _;
    }
    
    modifier isPayAmountCorrect() {    //Verifies if it is the users round to widraw
        require(msg.value >= cashIn, 'Fondos Insuficientes');
        _;
    }
    
    modifier atStage(Stages _stage) {
        require(stage == _stage);
        _;
    }
    
    modifier timedTransitions() {
        if (stage == Stages.setup && now >= creationTime + 1 minutes)
            stage = Stages.save;
        if (stage == Stages.save && now >= creationTime + 1 minutes + groupSize*60 + 1 minutes)
            stage=Stages.finished;
        _;
    }

    constructor(uint _cashIn, uint _saveAmount, uint8 _groupSize) public {
        admin = msg.sender;
        cashIn = _cashIn;
        saveAmount = _saveAmount;
        groupSize = _groupSize;
        stage = Stages.setup;
        creationTime=now;
    }

    function registerUser() public timedTransitions isPayAmountCorrect atStage(Stages.setup) payable{
        require(usersCounter < groupSize, "El grupo esta completo");    //the saving circle is full
        usersCounter++;
        users[msg.sender] = User(usersCounter, msg.sender, false, false, true, false);
        addressOrderList.push(msg.sender);  //store user
        totalCashIn = totalCashIn + msg.value;
        users[msg.sender].cashInFlag = true;
        CashInPayeesCount++;
        if (CashInPayeesCount == groupSize){
            //admin.transfer(totalCashIn);
            CashInPayeesCount = 0;
        }
    }

    function payTurn() public timedTransitions isRegisteredUser isPayAmountCorrect atStage(Stages.save) payable {    //users make the payment for the cycle
        require(users[msg.sender].saveAmountFlag == false, "Ya ahorraste este turno");  //you have already saved this round
        require(now <= creationTime + 1 minutes + turn*60 , 'Pago tardio');
        totalSaveAmount = totalSaveAmount + msg.value;
        users[msg.sender].saveAmountFlag = true;
        saveAmountPayeesCount++;
        if (saveAmountPayeesCount == groupSize){
            saveAmountPayeesCount = 0;
        }
    }

    function WithdrawTurn() payable timedTransitions isRegisteredUser isUsersTurn atStage(Stages.save) public {   //User assigned to the round can widraw
        
        if(totalSaveAmount != groupSize*saveAmount){
            for(uint8 i = 0; i<groupSize; i++){
                address useraddress = addressOrderList[i];
                if(now >= creationTime + 1 minutes + turn*60 && users[useraddress].saveAmountFlag == false){
                    users[useraddress].latePaymentFlag = true;
                    totalSaveAmount = totalSaveAmount + saveAmount;
                    totalCashIn = totalCashIn - saveAmount;
                }
            }
        }
        require(totalSaveAmount==groupSize*saveAmount, "Espera a que tengamos el monto de tu ahorro");     //Se debe estar en fase de pago
        address addressUserInTurn = addressOrderList[turn-1];
        users[addressUserInTurn].userAddr.transfer(totalSaveAmount);
        turn++;
        newTurn();
    }


    function newTurn() private{    //repeats the save and pay stages according to the saving circle size
        for(uint8 i = 0; i<groupSize; i++){
            address useraddress = addressOrderList[i];
            users[useraddress].saveAmountFlag = false;
        }
        totalSaveAmount = 0;
    }


    function withdrawCashIn() payable timedTransitions public atStage(Stages.finished){  //When all the rounds are done the admin sends the cash in to the users
        for(uint8 i = 0; i<groupSize; i++){
            address useraddress = addressOrderList[i];
            users[useraddress].cashInFlag = false;
            users[useraddress].currentRoundFlag = false;
            if (users[useraddress].latePaymentFlag = false){
            users[useraddress].userAddr.transfer(cashIn);
            }
        }
        totalCashIn=0;
        CashInPayeesCount = 0;
        usersCounter = 0;
        addressOrderList = new address[](0);
        stage = Stages.setup;
        totalSaveAmount = 0;
        turn=1;
        creationTime=now;
    }
}
