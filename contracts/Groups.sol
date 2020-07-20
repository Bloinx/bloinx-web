pragma solidity >=0.4.22 <0.7.0;
pragma experimental ABIEncoderV2;

contract Groups {
    struct User {
        uint256 userId;
        string userName;
        address payable founds;
        bool fee;
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

    User[] usersList;
    Room[] roomsList;

    address payable public admin;

    constructor(uint _fee) public {
        admin = msg.sender;
        feeSize = _fee;
    }

    function registerUser(string memory _userName) public {
        if(usersCounter >= 2) {
            revert("El grupo esta completo");
        }
        usersCounter ++;
        users[msg.sender] = User(usersCounter, _userName, msg.sender, false);
        usersList.push(users[msg.sender]);
    }

    function payFee() public payable {
      require(msg.value > 0, 'Fondos Insuficientes');
        admin.transfer(msg.value);
        users[msg.sender].fee = true;
    }
}