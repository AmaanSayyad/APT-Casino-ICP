import { Actor, HttpAgent, Identity } from "@dfinity/agent";
import { canisterId, createActor } from "../declarations/backend";

export const backend = createActor(canisterId);

export function setActorIdentity(identity) {
  Actor.agentOf(backend).replaceIdentity(identity);
}
