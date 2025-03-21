import Random "mo:base/Random";
import Principal "mo:base/Principal";
import Trie "mo:base/Trie";
import List "mo:base/List";
import Result "mo:base/Result";
import Nat8 "mo:base/Nat8";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Debug "mo:base/Debug";

actor class Roulette() = this {
    type BetType = {
        #straight : Nat8;
        #split : Nat8;
        #street : Nat8;
        #corner : Nat8;
        #line : Nat8;
        #column : Nat8;
        #dozen : Nat8;
        #redBlack : Bool; // true for red
        #evenOdd : Bool; // true for even
        #lowHigh : Bool; // true for low (1-18)
    };

    type Bet = {
        betType : BetType;
        amount : Nat;
    };

    type PlayerState = {
        bets : List.List<Bet>;
        hasPlaced : Bool;
    };

    stable var currentRound : Trie.Trie<Principal, PlayerState> = Trie.empty();
    stable var balances : Trie.Trie<Principal, Nat> = Trie.empty();
    stable var isSpinning : Bool = false;
    stable var redNumbers : [Nat8] = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

    // Trie utilities
    func key(p : Principal) : Trie.Key<Principal> = {
        hash = Principal.hash(p);
        key = p;
    };

    // Helper functions
    func isRed(n : Nat8) : Bool {
        Array.find<Nat8>(redNumbers, func(x) { x == n }) != null;
    };

    public shared ({ caller }) func deposit() : async () {
        // In a real implementation, this would handle actual ICP transfers
        let currentBalance = Option.get(Trie.get(balances, key(caller), Principal.equal), 0);
        balances := Trie.put(balances, key(caller), Principal.equal, currentBalance).0;
    };

    public shared ({ caller }) func withdraw(amount : Nat) : async Result.Result<(), Text> {
        let currentBalance = Option.get(Trie.get(balances, key(caller), Principal.equal), 0);
        if (currentBalance < amount) {
            return #err("Insufficient balance");
        };
        balances := Trie.put(balances, key(caller), Principal.equal, currentBalance - amount).0;
        #ok(());
    };

    public shared ({ caller }) func placeBet(bets : [Bet]) : async Result.Result<(), Text> {
        if (isSpinning) return #err("Round in progress");

        let totalAmount = Array.foldLeft<Bet, Nat>(bets, 0, func(acc, b) { acc + b.amount });
        let balance = Option.get(Trie.get(balances, key(caller), Principal.equal), 0);
        if (balance < totalAmount) return #err("Insufficient balance");

        // Deduct balance
        balances := Trie.put(balances, key(caller), Principal.equal, balance - totalAmount).0;

        // Add to current round
        let playerState = Option.get(
            Trie.get(currentRound, key(caller), Principal.equal),
            {
                bets = List.nil();
                hasPlaced = false;
            },
        );

        let newBets = List.append(playerState.bets, List.fromArray(bets));
        let newState = {
            bets = newBets;
            hasPlaced = true;
        };

        currentRound := Trie.put(currentRound, key(caller), Principal.equal, newState).0;

        if (not isSpinning) {
            isSpinning := true;
            ignore spinWheel();
        };

        #ok(());
    };

    func spinWheel() : async () {
        let players = Trie.iter(currentRound);
        let winningNumber = await getRandomNumber();

        for ((player, state) in players) {
            var payout : Nat = 0;
            for (bet in Iter.fromList(state.bets)) {
                if (checkWin(bet, winningNumber)) {
                    payout += calculatePayout(bet);
                };
            };
            if (payout > 0) {
                let currentBalance = Option.get(Trie.get(balances, key(player), Principal.equal), 0);
                balances := Trie.put(balances, key(player), Principal.equal, currentBalance + payout).0;
            };
        };

        // Reset round
        currentRound := Trie.empty();
        isSpinning := false;
    };

    func getRandomNumber() : async Nat8 {
        let entropy = await Random.blob();
        var f = Random.Finite(entropy);
        var num : ?Nat = null;

        while (num == null) {
            try {
                num := f.range(37); // 0-36
            } catch e {
                f := Random.Finite(await Random.blob());
            };
        };

        Nat8.fromNat(Option.get(num, 0));
    };

    func checkWin(bet : Bet, winningNumber : Nat8) : Bool {
        switch (bet.betType) {
            case (#straight n) { n == winningNumber };
            case (#split n) { checkSplit(n, winningNumber) };
            case (#street n) { checkStreet(n, winningNumber) };
            case (#corner n) { checkCorner(n, winningNumber) };
            case (#line n) { checkLine(n, winningNumber) };
            case (#column n) { (winningNumber - 1) % 3 == (n - 1) % 3 };
            case (#dozen n) { (winningNumber - 1) / 12 == (n - 1) };
            case (#redBlack isRedBet) { isRedBet == isRed(winningNumber) };
            case (#evenOdd isEven) {
                if (winningNumber == 0) false else {
                    winningNumber % 2 == (if isEven 0 else 1);
                };
            };
            case (#lowHigh isLow) {
                if (winningNumber == 0) false else {
                    (winningNumber <= 18) == isLow;
                };
            };
        };
    };

    func calculatePayout(bet : Bet) : Nat {
        switch (bet.betType) {
            case (#straight _) { bet.amount * 35 };
            case (#split _) { bet.amount * 17 };
            case (#street _) { bet.amount * 11 };
            case (#corner _) { bet.amount * 8 };
            case (#line _) { bet.amount * 5 };
            case (#column _) { bet.amount * 2 };
            case (#dozen _) { bet.amount * 2 };
            case (#redBlack _) { bet.amount * 1 };
            case (#evenOdd _) { bet.amount * 1 };
            case (#lowHigh _) { bet.amount * 1 };
        };
    };

    // Split validation logic
    func checkSplit(n : Nat8, wn : Nat8) : Bool {
        let splits : [[Nat8]] = [
            [1, 2],
            [2, 3],
            [4, 5],
            [5, 6],
            [7, 8],
            [8, 9],
            [10, 11],
            [11, 12],
            [13, 14],
            [14, 15],
            [16, 17],
            [17, 18],
            [19, 20],
            [20, 21],
            [22, 23],
            [23, 24],
            [25, 26],
            [26, 27],
            [28, 29],
            [29, 30],
            [31, 32],
            [32, 33],
            [34, 35],
            [35, 36],
            [1, 4],
            [2, 5],
            [3, 6],
            [4, 7],
            [5, 8],
            [6, 9],
            [7, 10],
            [8, 11],
            [9, 12],
            [10, 13],
            [11, 14],
            [12, 15],
            [13, 16],
            [14, 17],
            [15, 18],
            [16, 19],
            [17, 20],
            [18, 21],
            [19, 22],
            [20, 23],
            [21, 24],
            [22, 25],
            [23, 26],
            [24, 27],
            [25, 28],
            [26, 29],
            [27, 30],
            [28, 31],
            [29, 32],
            [30, 33],
            [31, 34],
            [32, 35],
            [33, 36],
        ];
        Array.find<[Nat8]>(
            splits,
            func(pair) {
                (pair[0] == n and pair[1] == wn) or (pair[1] == n and pair[0] == wn);
            },
        ) != null;
    };

    // Street validation logic
    func checkStreet(n : Nat8, wn : Nat8) : Bool {
        let street = (n - 1) * 3 + 1;
        street <= wn and wn <= street + 2;
    };

    // Corner validation logic
    func checkCorner(n : Nat8, wn : Nat8) : Bool {
        let corners : [[Nat8]] = [
            [1, 2, 4, 5],
            [2, 3, 5, 6],
            [4, 5, 7, 8],
            [5, 6, 8, 9],
            [7, 8, 10, 11],
            [8, 9, 11, 12],
            [10, 11, 13, 14],
            [11, 12, 14, 15],
            [13, 14, 16, 17],
            [14, 15, 17, 18],
            [16, 17, 19, 20],
            [17, 18, 20, 21],
            [19, 20, 22, 23],
            [20, 21, 23, 24],
            [22, 23, 25, 26],
            [23, 24, 26, 27],
            [25, 26, 28, 29],
            [26, 27, 29, 30],
            [28, 29, 31, 32],
            [29, 30, 32, 33],
            [31, 32, 34, 35],
            [32, 33, 35, 36],
        ];
        Array.find<[Nat8]>(
            corners,
            func(corner) {
                Array.find<Nat8>(corner, func(num) { num == wn }) != null and Array.find<Nat8>(corner, func(num) { num == n }) != null
            },
        ) != null;
    };

    // Line validation logic
    func checkLine(n : Nat8, wn : Nat8) : Bool {
        let row = (n - 1) * 6 + 1;
        row <= wn and wn <= row + 5;
    };

    public query func getBalance() : async Nat {
        let caller = Principal.fromActor(this);
        Option.get(Trie.get(balances, key(caller), Principal.equal), 0);
    };

};
