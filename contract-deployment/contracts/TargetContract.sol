// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TargetContract {
    uint256 public receivedValue;

    // Function to receive Ether
    receive() external payable {
        receivedValue += msg.value;
    }

    // Function to check received value
    function getReceivedValue() external view returns (uint256) {
        return receivedValue;
    }
}
