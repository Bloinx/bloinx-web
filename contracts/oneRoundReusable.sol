pragma solidity >=0.4.22 <0.7.0;
pragma experimental ABIEncoderV2;

contract oneRoundReusable {
    enum Stages {
        //Stages of the round
        Setup,
        Save,
        Finished
    }

    struct User {
        //Information from each user
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
    uint256 startTime;
    uint256 public totalSaveAmount = 0; //Collective saving on the round
    uint256 public totalCashIn = 0;
    uint256 public cashOutUsers;
    uint256 cashOut=0;
    address[] public addressOrderList=[address(0),address(0),address(0)];
    Stages public stage;

    //Time constants in seconds
    uint256 payTime = 5 * 60;
    uint256 withdrawTime = 5 * 60;

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
        //Verifies if it is not the users round to widraw
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

    modifier onlyAdmin() {
        require(msg.sender == admin, "Solo el admin puede llamar la funcion");
        _;
    }

    function registerUser(uint256 _usrTurn)
        public
        payable
        isPayAmountCorrect
        atStage(Stages.Setup)
    {
        require(usersCounter < groupSize, "El grupo esta completo"); //the saving circle is full
        require(addressOrderList[_usrTurn-1]==address(0), "Este lugar ya esta ocupado" );
        usersCounter++;
        totalCashIn = totalCashIn + msg.value;
        users[msg.sender] = User(
            msg.sender,
            true,
            false,
            true,
            false
        );
        addressOrderList[_usrTurn-1]=msg.sender; //store user
        CashInPayeesCount++;
    }

    function removeUser(uint256 _usrTurn)
        public
        payable
        onlyAdmin
        atStage(Stages.Setup)
    {
      require(addressOrderList[_usrTurn-1]!=address(0), "Este turno esta vacio");
      if(users[msg.sender].cashInFlag == true){
          totalCashIn = totalCashIn - msg.value;
          users[msg.sender].userAddr.transfer(cashIn);
          CashInPayeesCount--;
          users[msg.sender].cashInFlag = false;
      }
      addressOrderList[_usrTurn-1]=address(0);
      usersCounter--;
      users[msg.sender].currentRoundFlag = false;
    }

    function startRound()
        public
        onlyAdmin
        atStage(Stages.Setup)
    {
        require(CashInPayeesCount == groupSize, "Aun hay lugares sin asignar");
        stage = Stages.Save;
        startTime=now;
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
        require(now <= startTime + turn*payTime + (turn-1)*withdrawTime , "Pago tardio");
        totalSaveAmount = totalSaveAmount + msg.value;
        users[msg.sender].saveAmountFlag = true;
        saveAmountPayeesCount++;
        if (saveAmountPayeesCount == groupSize-1) {
            saveAmountPayeesCount = 0;
        }
    }

    function payLateTurn()
        public
        payable
        isRegisteredUser
        isPayAmountCorrect
        atStage(Stages.Save)
    {
        //users make the payment for the cycle
        require(
            users[msg.sender].latePaymentFlag == true,
            "Estas al corriente en pagos"
        ); //you have already saved this round
        totalCashIn = totalCashIn + msg.value;
        if (totalCashIn == groupSize*cashIn) {
            users[msg.sender].latePaymentFlag == false;
        }
    }

    function withdrawTurn()
        public
        payable
        isRegisteredUser
        atStage(Stages.Save)
        isUsersTurn
    {
        require(now <= startTime + turn*payTime + turn*withdrawTime , "Termino el tiempo de retiro");
        if (
            startTime + turn*payTime + (turn-1)*withdrawTime < now
        ) {
            for (uint8 i = 0; i < groupSize; i++) {
                address useraddress = addressOrderList[i];
                if (users[useraddress].saveAmountFlag == false && addressOrderList[turn - 1] != users[useraddress].userAddr
                ) {
                    totalCashIn = totalCashIn - saveAmount;
                    totalSaveAmount = totalSaveAmount + saveAmount;
                    if (users[useraddress].latePaymentFlag == false){
                        cashOutUsers--;
                        users[useraddress].latePaymentFlag = true;
                        CashInPayeesCount--;
                        users[useraddress].cashInFlag = false;
                    }
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

    function advanceTurn()
        public
        payable
        onlyAdmin
        atStage(Stages.Save)
    {
        require(startTime + turn*payTime + turn*withdrawTime < now , "El usuario en turno aun puede retirar");
        if (
            totalSaveAmount < (groupSize-1) * saveAmount
            )
        {
            for (uint8 i = 0; i < groupSize; i++) {
                address useraddress = addressOrderList[i];
                if (users[useraddress].saveAmountFlag == false && addressOrderList[turn - 1] != users[useraddress].userAddr
                ) {
                    totalCashIn = totalCashIn - saveAmount;
                    totalSaveAmount = totalSaveAmount + saveAmount;
                    if (users[useraddress].latePaymentFlag == false){
                        cashOutUsers--;
                        users[useraddress].latePaymentFlag = true;
                        CashInPayeesCount--;
                        users[useraddress].cashInFlag = false;
                    }
                }

             }
        }

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

    function withdrawCashIn()
        public
        payable
        atStage(Stages.Finished)
        onlyAdmin
    {
        //When all the rounds are done the admin sends the cash in to the users
        cashOut=totalCashIn/cashOutUsers;
        for (uint8 i = 0; i < groupSize; i++) {
            address useraddress = addressOrderList[i];
            if (users[useraddress].latePaymentFlag == false) {
                users[useraddress].userAddr.transfer(cashOut);
            }
        }
    }

    function restartRound()
        public
        payable
        atStage(Stages.Finished)
        onlyAdmin
    {
        if(totalCashIn<cashIn*cashOutUsers){
            cashOut=totalCashIn/cashOutUsers;
            for(uint8 i = 0; i<groupSize; i++){
                address useraddress = addressOrderList[i];
                if (users[useraddress].latePaymentFlag == false) {
                    users[useraddress].userAddr.transfer(cashOut);
                }
                users[useraddress].cashInFlag = false;
                users[useraddress].latePaymentFlag = false;
                users[useraddress].saveAmountFlag = false;
            }
            totalCashIn=0;
        }
        else if (totalCashIn==cashIn*cashOutUsers){
            for (uint8 i = 0; i < groupSize; i++) {
                address useraddress = addressOrderList[i];
                users[useraddress].latePaymentFlag = false;
                users[useraddress].saveAmountFlag = false;
            }
        }
        cashOutUsers = groupSize;
        totalSaveAmount = 0;
        turn = 1;
        stage = Stages.Setup;
    }

    function payCashIn()
        public
        payable
        atStage(Stages.Setup)
        isRegisteredUser
    {       //Receive the comitment payment
        require(users[msg.sender].cashInFlag == false, "Ya tenemos regisrado tu CashIn"); //you have payed the cash in
        require(msg.value == cashIn, 'Fondos Insuficientes');   //insufucuent funds
        totalCashIn = totalCashIn + msg.value;
        users[msg.sender].cashInFlag = true;
        CashInPayeesCount++;
    }
}
