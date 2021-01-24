pragma solidity >=0.4.22 <0.7.0;

import "./oneRoundReusableV2.sol";

contract main {
    oneRoundReusableV2[] public childTanda;

    function createTanda(uint256 _garantia, uint256 _ahorro, uint256 _groupSize) external payable {

        oneRoundReusableV2 newTanda = new oneRoundReusableV2(_garantia, _ahorro, _groupSize, msg.sender);
        childTanda.push(newTanda);
    }
}
