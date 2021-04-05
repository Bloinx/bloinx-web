// SPDX-License-Identifier: MIT
pragma solidity ^0.7.2;

import "./oneRoundReusable.sol";

contract main{
    oneRoundReusable[] public childTanda;
    event TandaCreated(oneRoundReusable childTanda);

    function createTanda(uint256 _garantia, uint256 _ahorro, uint256 _groupSize) external payable {

        oneRoundReusable newTanda = new oneRoundReusable(_garantia, _ahorro, _groupSize, msg.sender);
        childTanda.push(newTanda);
        emit TandaCreated(newTanda);
    }
}
