pragma solidity >=0.4.21 <0.7.0;

contract Tanda {

    enum Stages {   //Stages of the round
        setup,      //receive the initial fees
        saveN1,     //receive payments for stage number 1
        payN1,      //send savings to user in 1rst number
        AreWeDoneYet,
        Finished
    }
    
    address[] public friends;
    address public admin;
    Stages public stage;
    uint public cuota_inscripcion;  //in wei
    uint public round;
    uint public payment_amout;  //in wei

    // modifier to check if caller is admin
    modifier isAdmin() {
        require(msg.sender == admin, "Debes ser admin para llamar esta funcion");
        _;
    }
    

    constructor() public{
        admin = msg.sender;
        stage = Stages.setup;
        round = 0;
        cuota_inscripcion = 1;
        payment_amout =  2;
    }
    
    
    function edit_cuota_inscripcion(uint new_cuota) public isAdmin {
        cuota_inscripcion = new_cuota;
    }
    
    function edit_payment_amount(uint new_amount) public isAdmin {
        payment_amout = new_amount;
    }
    
    
    function enter() public payable {
        require( friends.length < 5, "Este grupo esta lleno" );
        require( msg.value > cuota_inscripcion, "Debes pagar tu cuota de inscripcion" );
        friends.push(msg.sender);
    }
    
    function save_round() public payable {   //Función para depositar el ahorro
        // require msg.sender is in friends list  (verificar cómo hacer esto con mapping)
        require(stage ==  Stages.saveN1);
        // require ronda < participantes

    }
    
    function increase_round() public isAdmin {  //To follow the friend in turn
        round++;
        stage = Stages.saveN1;
    }
    
    
    function withdraw_round() public payable returns (uint) {  //Withdraw the savings to the friend in turn
        require(stage == Stages.payN1);
        increase_round();
        uint payment = address(this).balance - friends.length;  // Este ajuste se debe modificar cuando el dinero sea enviado a Compound
        return(payment); //comment this
        //address(friends[round]).transfer(payment);
        
    }
    
    
    
    

}