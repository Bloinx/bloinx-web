pragma solidity >=0.4.21 <0.7.0;

contract Groups {
  struct User {
    uint userId;
    string userName;
    address payable founds;
  }

  address public admin;

  constructor() public {
    admin = msg.sender;
  }

  function createGroup() public {
    // Se creara una posicion en el arreglo y ese sera un grupo.
  }

  function addUsersToGroup() public {
    // Se tomaran X cantidad de usuarios para añadirlos al grupo que se esta formando.
  }
}
