pragma solidity >=0.4.22 <0.7.0;
pragma experimental ABIEncoderV2;

contract oneRoundReusable {
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
    uint256 cashOutUsers;
    address[] public addressOrderList;
    Stages public stage;

    constructor(
        uint256 _cashIn,
        uint256 _saveAmount,
        uint8 _groupSize
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
            "Debes esperar tu turno para retirar"
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
    {
        require(usersCounter < groupSize, "El grupo esta completo"); //the saving circle is full
        require(now <= creationTime + 3 minutes, "El tiempo de registro ha terminado");
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
    {
        //users make the payment for the cycle
        require(
            users[msg.sender].saveAmountFlag == false,
            "Ya ahorraste este turno"
        ); //you have already saved this round
        require(now <= creationTime + 3 minutes + (turn*3)*60 + ((turn-1)*1)*60 , "Pago tardio");
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
        isUsersTurn
    {
        require(now <= creationTime + 3 minutes + (turn*3)*60 + (turn*1)*60 , "Termino el tiempo de retiro");
        //User assigned to the round can widraw
        if (totalSaveAmount != groupSize * saveAmount) {
            for (uint8 i = 0; i < groupSize; i++) {
                address useraddress = addressOrderList[i];
                if (
                    now >= creationTime + 3 minutes + (turn*3)*60 + ((turn-1)*1)*60 == false
                    //users[useraddress].saveAmountFlag == false
                ) {
                    users[useraddress].latePaymentFlag = true;
                    totalSaveAmount = totalSaveAmount + saveAmount;
                    totalCashIn = totalCashIn - saveAmount;
                    cashOutUsers=cashOutUsers-1;
                }
            }
        }
        require(
            totalSaveAmount == groupSize * saveAmount-1,
            "Espera a que tengamos el monto de tu ahorro"
        ); //Se debe estar en fase de pago
        address addressUserInTurn = addressOrderList[turn - 1];
        users[addressUserInTurn].userAddr.transfer(totalSaveAmount);
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
        totalSaveAmount = 0;// si no se retira el ahorro se podrian quedar fondos en el contrato
    }

    function withdrawCashIn() 
        public 
        payable 
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
        creationTime = now + 3 minutes; //remove 3 minutes from registration
    }
}
