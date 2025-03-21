import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Bet { 'betType' : BetType, 'amount' : bigint }
export type BetType = { 'evenOdd' : boolean } |
  { 'street' : number } |
  { 'redBlack' : boolean } |
  { 'straight' : number } |
  { 'line' : number } |
  { 'split' : number } |
  { 'lowHigh' : boolean } |
  { 'column' : number } |
  { 'corner' : number } |
  { 'dozen' : number };
export type Result = { 'ok' : null } |
  { 'err' : string };
export interface Roulette {
  'deposit' : ActorMethod<[], undefined>,
  'getBalance' : ActorMethod<[], bigint>,
  'placeBet' : ActorMethod<[Array<Bet>], Result>,
  'withdraw' : ActorMethod<[bigint], Result>,
}
export interface _SERVICE extends Roulette {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
