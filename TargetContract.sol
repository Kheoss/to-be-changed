// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TargetContract {
    uint256 public receivedValue;

    // Function to receive Ether
    function receive() public payable {
        receivedValue += msg.value;
    }

    // Function to check received value
    function getReceivedValue() public view returns (uint256) {
        return receivedValue;
    }
}
