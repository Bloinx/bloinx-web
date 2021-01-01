pragma solidity >=0.4.22 <0.7.0;
pragma experimental ABIEncoderV2;

contract oneRound {
    enum Stages {
        //Stages of the round
        Setup, //register and receive the initial cash in
        Save, //receive payments
        Finished //Cash in is sent to the users
    }

    struct User {
        //Information from each user
        uint8 userId;
        address payable userAddr;
        bool cashInFlag;
        bool saveAmountFlag;
        bool currentRoundFlag; //defines if the user is participating in the current round
        bool latePaymentFlag;
    }

    mapping(address => User) public users;
    address payable public admin; //The user that deploy the contract is the administrator

    //Constructor deployment variables
    uint256 cashIn; //amount to be payed as commitment at the begining of the saving circle
    uint256 saveAmount; //Payment on each round/cycle
    uint256 public groupSize; //Number of slots for users to participate on the saving circle

    //Counters and flags
    uint8 usersCounter = 0;
    uint256 CashInPayeesCount = 0; //Comitment payments counter
    uint256 saveAmountPayeesCount = 0; //Payments done in round counter
    uint256 public turn = 1; //Current cycle/round in the saving circle
    uint256 creationTime;
    uint256 public totalSaveAmount = 0; //Collective saving on the round
    uint256 public totalCashIn = 0;
    uint256 public cashOutUsers;
    address[] public addressOrderList;
    Stages public stage;

    constructor(
        uint256 _cashIn,
        uint256 _saveAmount,
        uint256 _groupSize
    ) public {
        admin = msg.sender;
        cashIn = _cashIn * 1e17;
        saveAmount = _saveAmount * 1e17;
        groupSize = _groupSize;
        cashOutUsers = groupSize;
        stage = Stages.Setup;
        creationTime = now;
    }

    modifier isUsersTurn() {
        //Verifies if it is the users round to widraw
        require(
            msg.sender == addressOrderList[turn - 1],
            "Debes esperar tu turno para retirar"
        );
        _;
    }

modifier isNotUsersTurn() {
        //Verifies if it is the users round to widraw
        require(
            msg.sender != addressOrderList[turn - 1],
            "En este turno no depositas"
        );
        _;
    }

    modifier isRegisteredUser() {
        //Verifies if it is the users round to widraw
        require(
            users[msg.sender].currentRoundFlag == true,
            "Usuario no registrado"
        );
        _;
    }

    modifier isPayAmountCorrect() {
        //Verifies if it is the users round to widraw
        require(msg.value == cashIn, "Fondos Insuficientes");
        _;
    }

    modifier atStage(Stages _stage) {
        require(stage == _stage);
        _;
    }

/*    modifier timedTransitions() {
        if (stage == Stages.Setup && now >= creationTime + 3 minutes) {
            stage = Stages.Save;
        }
        if (
            stage == Stages.Save &&
            now >= creationTime + 3 minutes + groupSize * 60 + 1 minutes
        ) stage = Stages.Finished;
        _;
    }*/

    modifier onlyAdmin() {
        require(msg.sender == admin, "Solo el admin puede llamar la funcion");
        _;
    }

    function registerUser()
        public
        payable
        isPayAmountCorrect
        atStage(Stages.Setup)
    {
        require(usersCounter < groupSize, "El grupo esta completo"); //the saving circle is full
        require(now <= creationTime + 1 minutes, "El tiempo de registro ha terminado");
        usersCounter++;
        users[msg.sender] = User(
            usersCounter,
            msg.sender,
            false,
            false,
            true,
            false
        );
        addressOrderList.push(msg.sender); //store user
        totalCashIn = totalCashIn + msg.value;
        users[msg.sender].cashInFlag = true;
        CashInPayeesCount++;
        if (CashInPayeesCount == groupSize) {
            CashInPayeesCount = 0;
            stage = Stages.Save;
        }
    }

    function payTurn()
        public
        payable
        isRegisteredUser
        isPayAmountCorrect
        isNotUsersTurn
        atStage(Stages.Save)
    {
        //users make the payment for the cycle
        require(
            users[msg.sender].saveAmountFlag == false,
            "Ya ahorraste este turno"
        ); //you have already saved this round
        require(now <= creationTime + 1 minutes + (turn*1)*60 + ((turn-1)*1)*60 , "Pago tardio");
        totalSaveAmount = totalSaveAmount + msg.value;
        users[msg.sender].saveAmountFlag = true;
        saveAmountPayeesCount++;
        if (saveAmountPayeesCount == groupSize-1) {
            saveAmountPayeesCount = 0;
        }
    }

    function withdrawTurn()
        public
        payable
        isRegisteredUser
        atStage(Stages.Save)
        isUsersTurn
    {
        require(now <= creationTime + 1 minutes + (turn*1)*60 + (turn*1)*60 , "Termino el tiempo de retiro");
        if (
            creationTime + 1 minutes + turn*1*60 + (turn-1)*1*60 < now
        ) {
            for (uint8 i = 0; i < groupSize; i++) {
                address useraddress = addressOrderList[i];
                if (users[useraddress].saveAmountFlag == false && addressOrderList[turn - 1] != users[useraddress].userAddr
                ) {
                    totalCashIn = totalCashIn - saveAmount;
                    totalSaveAmount = totalSaveAmount + saveAmount;
                    cashOutUsers=cashOutUsers-1;
                    users[useraddress].latePaymentFlag = true;
                }
                    
             }
            
        }
        require(
            totalSaveAmount == (groupSize-1) * saveAmount,
            "Espera a que tengamos el monto de tu ahorro"
        ); //Se debe estar en fase de pago
        address addressUserInTurn = addressOrderList[turn - 1];
        users[addressUserInTurn].userAddr.transfer(totalSaveAmount);
        totalSaveAmount = 0;
        if (turn >= groupSize) {
            stage = Stages.Finished;
        } else {
            newTurn();
        }
        turn++;
    }

    function newTurn() private {
        //repeats the save and pay stages according to the saving circle size
        for (uint8 i = 0; i < groupSize; i++) {
            address useraddress = addressOrderList[i];
            users[useraddress].saveAmountFlag = false;
        }
    }

    function withdrawCashIn()
        public
        payable
        atStage(Stages.Finished)
        onlyAdmin
    {
        //When all the rounds are done the admin sends the cash in to the users
        uint256 cashOut=totalCashIn/cashOutUsers;
        for (uint8 i = 0; i < groupSize; i++) {
            address useraddress = addressOrderList[i];
            users[useraddress].cashInFlag = false;
            users[useraddress].currentRoundFlag = false;
            if (users[useraddress].latePaymentFlag == false) {
                users[useraddress].userAddr.transfer(cashOut);
            }
        }
        totalCashIn = 0;
        CashInPayeesCount = 0;
        cashOutUsers = groupSize;
        usersCounter = 0;
        addressOrderList = new address[](0);
        stage = Stages.Save;
        totalSaveAmount = 0;
        turn = 1;
        creationTime = now - 1 minutes; //remove 3 minutes from registration
    }
}
