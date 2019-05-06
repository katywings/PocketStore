import { Action, NewAction, NormalizedAction } from "../action/types";
import { ActionNormalizer } from "../actionNormalizer";
import {
  ActionNormalizerInterface,
  NormalizeOptions
} from "../actionNormalizer/types";
import { ActionResolver } from "../actionResolver";
import { ActionResolverInterface } from "../actionResolver/types";
import { DeepPartial } from "../util/types";
import { isAction } from "../action";
import { Listener, SubscribableInterface } from "../subscribable/types";
import { Mutator } from "../mutator";
import { setWildCard } from "../event";
import { StoreInterface } from "./types";
import { Subscribable } from "../subscribable";
import { cloneDeep as _cloneDeep } from "../util";

export var actionTypes = {
  INIT: "@@init"
};

export class Store<T extends Mutator> implements StoreInterface {
  _isMutating: boolean;
  _state: any = null;
  _action: Action;
  _effectHandler: any;
  _mutator: Mutator;
  _actionNormalizer: ActionNormalizerInterface;
  _actionResolver: ActionResolverInterface;
  _subscribable: SubscribableInterface<Store<T>>;
  _cloneDeep: typeof _cloneDeep;
  _pureByDefault: boolean;

  constructor({
    mutator,
    state,
    actionNormalizer = new ActionNormalizer(),
    actionResolver = new ActionResolver(),
    subscribable = new Subscribable(),
    cloneDeep = _cloneDeep,
    pureByDefault = false
  }: {
    mutator: T;
    state?: DeepPartial<ReturnType<ReturnType<T>>>;
    actionNormalizer?: ActionNormalizerInterface;
    actionResolver?: ActionResolverInterface;
    subscribable?: SubscribableInterface<Store<T>>;
    cloneDeep?: typeof _cloneDeep;
    pureByDefault?: boolean;
  }) {
    this._actionResolver = actionResolver;
    this._actionNormalizer = actionNormalizer;
    this._subscribable = subscribable;
    this._cloneDeep = cloneDeep;
    this._pureByDefault = pureByDefault;

    this._isMutating = false;
    this._mutator = mutator;

    // Initial set action
    this.dispatch({
      type: actionTypes.INIT,
      meta: {
        impure: true
      },
      payload: state
    });
  }

  /**
   * Returns the current state
   */
  getState = (): ReturnType<T> => {
    return this._state;
  };

  /**
   * Get the last dispatched action
   */
  getAction(): Action {
    return this._action;
  }

  subscribe(listener: Listener<this>, remember = false) {
    return this._subscribable.subscribe(listener, remember);
  }

  getActionNormalizer() {
    return this._actionNormalizer;
  }

  setActionNormalizer(actionNormalizer: ActionNormalizerInterface) {
    this._actionNormalizer = actionNormalizer;
  }

  getActionResolver() {
    return this._actionResolver;
  }

  setActionResolver(actionResolver: ActionResolverInterface) {
    this._actionResolver = actionResolver;
  }

  getSubscribable() {
    return this._subscribable;
  }

  setSubscribable(subscribable: SubscribableInterface<Store<T>>) {
    this._subscribable = subscribable;
  }

  /**
   * Send a message which will trigger an action
   */
  dispatch = (action: NewAction): Action | undefined => {
    if (!isAction(action)) {
      if (action) {
        console.error("Invalid action dispatched", action);
      }

      return;
    }

    if (!action.meta) action.meta = {};
    if (!action.meta.tmp) action.meta.tmp = {};

    return this._actionNormalizer.normalize({
      action: action as NormalizedAction,
      callBack: this._afterDispatchNormalization,
      store: this
    });
  };

  _callSubscribers = () => {
    this._subscribable.callSubscribers(this);
  };

  _afterDispatchNormalization: NormalizeOptions["callBack"] = action => {
    return this._actionResolver.resolve({
      action: action,
      store: this,
      setAction: this._setAction,
      callSubscribers: this._callSubscribers,
      applyMutator: this._applyMutator
    });
  };

  _applyMutator = (action: Action) => {
    let pureAction =
      action.meta.pure != null ? action.meta.pure : this._pureByDefault;
    let originalPayload = action.payload;
    if (action.payload != null && !pureAction) {
      action.payload = this._cloneDeep(originalPayload);
    }

    if (this._isMutating) {
      throw new Error("Mutations already in progress");
    }

    this._isMutating = true;

    if (action.type === actionTypes.INIT) {
      this._state = action.payload;
      setWildCard(action.event);
    }

    try {
      this._state = this._mutator(action, this._state);
    } catch (err) {
      console.error(err);
    }

    this._isMutating = false;

    action.payload = originalPayload;
  };

  /**
   * Override the last dispatched action
   *
   * @param action New action
   */
  _setAction = (action: Action) => {
    this._action = action;
  };
}
