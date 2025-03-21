export const idlFactory = ({ IDL }) => {
  const BetType = IDL.Variant({
    'evenOdd' : IDL.Bool,
    'street' : IDL.Nat8,
    'redBlack' : IDL.Bool,
    'straight' : IDL.Nat8,
    'line' : IDL.Nat8,
    'split' : IDL.Nat8,
    'lowHigh' : IDL.Bool,
    'column' : IDL.Nat8,
    'corner' : IDL.Nat8,
    'dozen' : IDL.Nat8,
  });
  const Bet = IDL.Record({ 'betType' : BetType, 'amount' : IDL.Nat });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const Roulette = IDL.Service({
    'deposit' : IDL.Func([], [], []),
    'getBalance' : IDL.Func([], [IDL.Nat], ['query']),
    'placeBet' : IDL.Func([IDL.Vec(Bet)], [Result], []),
    'withdraw' : IDL.Func([IDL.Nat], [Result], []),
  });
  return Roulette;
};
export const init = ({ IDL }) => { return []; };
