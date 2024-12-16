// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Roulette {
    IERC20 public token;
    uint256 public minBet;
    uint256 public maxBet;
    address public owner;

    uint256 public randomResult; // Store the random number

    enum BetType { Number, Color, OddEven, HighLow, Dozen, Column, Split, Street, Corner, Line }

    struct Bet {
        address player;
        uint256 amount;
        BetType betType;
        uint8 betValue;
    }

    Bet[] public bets;
    mapping(address => uint256) public playerBets;

    event BetPlaced(address indexed player, uint256 amount, BetType betType, uint8 betValue);
    event RandomNumberGenerated(uint256 randomNumber);
    event BetResult(address indexed player, uint256 amount, bool won);

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    constructor(IERC20 _token, uint256 _minBet, uint256 _maxBet) {
        token = _token;
        minBet = _minBet;
        maxBet = _maxBet;
        owner = msg.sender;
    }

    function placeBet(BetType betType, uint8 betValue, uint256 amount) external {
        require(amount >= minBet && amount <= maxBet, "Bet amount out of range");
        require(token.transferFrom(msg.sender, address(this), amount), "Token transfer failed");

        // Add the bet to the bets array
        bets.push(Bet({
            player: msg.sender,
            amount: amount,
            betType: betType,
            betValue: betValue
        }));

        playerBets[msg.sender] += amount;

        emit BetPlaced(msg.sender, amount, betType, betValue);

        // Generate random number and process bets
        generateAndProcessRandomNumber();
    }

    function generateAndProcessRandomNumber() internal {
        // Generate pseudo-random number
        randomResult = uint256(keccak256(abi.encodePacked(
            block.timestamp,
            block.difficulty,
            block.number,
            msg.sender
        ))) % 37; // Roulette numbers are between 0 and 36

        emit RandomNumberGenerated(randomResult);

        // Process bets based on the random result
        processBets();
    }

    function processBets() internal {
        for (uint256 i = 0; i < bets.length; i++) {
            Bet memory bet = bets[i];
            bool won = false;
            uint256 winnings = 0;

            // Check win conditions based on bet type
            if (bet.betType == BetType.Number && bet.betValue == randomResult) {
                won = true;
                winnings = bet.amount * 36; // Payout for straight-up bet
            } else if (bet.betType == BetType.Color && ((bet.betValue == 0 && isRed(randomResult)) || (bet.betValue == 1 && !isRed(randomResult)))) {
                won = true;
                winnings = bet.amount * 2; // Payout for color bet
            } else if (bet.betType == BetType.OddEven && ((bet.betValue == 0 && randomResult % 2 == 1) || (bet.betValue == 1 && randomResult % 2 == 0))) {
                won = true;
                winnings = bet.amount * 2; // Payout for odd/even bet
            } else if (bet.betType == BetType.HighLow && ((bet.betValue == 0 && randomResult >= 1 && randomResult <= 18) || (bet.betValue == 1 && randomResult >= 19 && randomResult <= 36))) {
                won = true;
                winnings = bet.amount * 2; // Payout for high/low bet
            }

            if (won) {
                require(token.transfer(bet.player, winnings), "Token transfer failed");
                emit BetResult(bet.player, winnings, true);
            } else {
                emit BetResult(bet.player, bet.amount, false);
            }

            playerBets[bet.player] -= bet.amount;
        }

        delete bets; // Clear all bets after processing
    }

    function isRed(uint256 number) internal pure returns (bool) {
        uint8[18] memory redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
        for (uint8 i = 0; i < redNumbers.length; i++) {
            if (redNumbers[i] == number) {
                return true;
            }
        }
        return false;
    }

    function withdrawTokens(uint256 amount) external onlyOwner {
        require(token.transfer(msg.sender, amount), "Token transfer failed");
    }
}
