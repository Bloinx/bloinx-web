pragma solidity ^0.7.2;

import "./oneRoundReusable.sol";

contract mainBloinx {
    oneRoundReusable[] public childTanda;
    
    function createTanda(uint256 _garantia, uint256 _ahorro, uint256 _groupSize) external payable {
        oneRoundReusable newTanda = new oneRoundReusable(_garantia, _ahorro, _groupSize);
        childTanda.push(newTanda);
    }
}