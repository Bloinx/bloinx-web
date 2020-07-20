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
    
    mapping(uint => User) public users;
    mapping(uint => Room) public rooms;
    uint roomCounter = 1;
    uint usersCounter = 0;
    
    User[] usersList;
    Room[3][] roomsList;
    
    address public admin;
    
    constructor() public {
        admin = msg.sender;
    }
    
    function registerUser(string memory _userName) public {
        if(usersCounter >= 2) {
            revert("El grupo esta completo");
        }
        usersCounter ++;
        users[usersCounter] = User(usersCounter, _userName, msg.sender, false);
        usersList.push(users[usersCounter]);
    }

    function payFee() public payable {
     // here is where user have to pay fee for guarantee
    }
    //function createRoom() public {
       //rooms[roomCounter] = Room(roomCounter, users[1].userName)
    //}
}