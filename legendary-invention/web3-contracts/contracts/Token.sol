// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor() ERC20("APT-Casino", "APTC") {
        _mint(msg.sender, 6219316768 * 10**18); // Mint 6219316768 tokens to the deployer
    }

    // Function to mint more tokens
    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}