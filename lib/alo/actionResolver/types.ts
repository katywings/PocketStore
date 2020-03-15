import { StoreInterface, Action } from "../main/core";

export type ResolveOptions = {
  action: Action;
  store: StoreInterface;
  setAction: StoreInterface["_setAction"];
  callSubscribers: StoreInterface["_callSubscribers"];
  applyMutator: StoreInterface["_applyMutator"];
};

export interface ActionResolverInterface {
  resolve(options: ResolveOptions): Action | undefined;
}
