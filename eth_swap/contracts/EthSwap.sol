//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";

import "./GTT.sol";

contract EthSwap {
    string public name = 'Eth Swap X';
    GTT public gtt;
    uint256 public rate = 100;

    constructor(GTT _gtt) {
        gtt = _gtt;
    }

    fallback() external payable {}

    receive() external payable {}
    
    
    function buyTokens() public payable {
        //Redemption rate
        uint256 tokenAmount = msg.value * rate;
        gtt.transfer(msg.sender, tokenAmount);
    }
}