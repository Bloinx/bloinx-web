pragma solidity >=0.4.21 <0.7.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/oneRoundReusable.sol";

contract TestOneRoundReusable {

  function testRegisterUser1() public {
    oneRoundReusable oneRoundReusable = oneRoundReusable(DeployedAddresses.oneRoundReusable(10,10,3));

    oneRoundReusable.registerUser(1);

    uint expected = msg.sender;

    Assert.equal(oneRoundReusable.addressOrderList(0), expected, "It should store the value 89.");
  }

}
