pragma solidity ^0.6.0;

contract StateMachine {
    enum Stages {   //Stages of the round
        setup,      //receive the initial fees
        saveN1,     //receive payments for stage number 1
        payN1,      //send savings to user in 1rst number
        AreWeDoneYet,
        Finished
    }

    struct user{    //stores the users
        address adr;
        bool   fee; 
    }
    
    address public admin;
    Stages public stage;    // This is the current stage.
    uint public creationTime;
    uint public amount;
    user usr1;
    user usr2;
    user usr3;
    user usr4;
    mapping (address => uint) private balances;
    
    constructor (address _usr1, address _usr2, address _usr3, address _usr4, uint _amount) public {
        admin = msg.sender;
        stage = Stages.setup;
        creationTime = now;
        usr1.adr=_usr1;
        usr2.adr=_usr2;
        usr3.adr=_usr3;
        usr4.adr=_usr4;
        usr1.fee=true;
        usr2.fee=true;
        usr3.fee=true;
        usr4.fee=true;
        amount=_amount;
    }

    modifier atStage(Stages _stage) {
        require(stage == _stage);
        _;
    }

    function nextStage() internal {
        stage = Stages(uint(stage) + 1);
    }

    // Perform timed transitions. Be sure to mention
    // this modifier first, otherwise the guards
    // will not take the new stage into account.
    modifier timedTransitions() {
        if (stage == Stages.setup &&
                    now >= creationTime + 2 minutes)
            nextStage();
        if (stage == Stages.saveN1 &&
                now >= creationTime + 4 minutes)
            nextStage();
        if (stage == Stages.payN1 &&
                now >= creationTime + 6 minutes)
            nextStage();
        /*if (stage == Stages.saveN2 &&
                now >= creationTime + 8 minutes)
            nextStage();
        if (stage == Stages.payN2 &&
                now >= creationTime + 10 minutes)
            nextStage();
        if (stage == Stages.saveN3 &&
                now >= creationTime + 12 minutes)
            nextStage();
        if (stage == Stages.payN3 &&
                now >= creationTime + 14 minutes)
            nextStage();
        if (stage == Stages.saveN4 &&
                now >= creationTime + 16 minutes)
            nextStage();
        if (stage == Stages.payN4 &&
                now >= creationTime + 18 minutes)
            nextStage();
        // The other stages transition by transaction */
        _;
    }

    // Order of the modifiers matters here!
    function payFee()
        public
        payable
        timedTransitions
        atStage(Stages.setup)
    {
        // We will not implement that here
    }

    function deposit()
        public
        payable
        timedTransitions
        atStage(Stages.saveN1)
    {
        balances[msg.sender] += msg.value;
    }
        function withraw(address _adr)
        public
        payable
        timedTransitions
        atStage(Stages.payN1)
    {
        uint number=amount*4;
        balances[msg.sender] -= number;
    }

    // This modifier goes to the next stage
    // after the function is done.
    modifier transitionNext()
    {
        _;
        nextStage();
    }

}

