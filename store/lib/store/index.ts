import { Action, NewAction } from "../action/types";
import { ActionNormalizer } from "../actionNormalizer";
import {
  ActionNormalizerInterface,
  NormalizeOptions,
} from "../actionNormalizer/types";
import { ActionResolver } from "../actionResolver";
import { ActionResolverInterface } from "../actionResolver/types";
import { DeepPartial } from "../util/types";
import { isAction } from "../action";
import { Listener, SubscribableInterface } from "../subscribable/types";
import { MutatorInterface } from "../mutator/types";
import { StoreInterface } from "./types";
import { Subscribable } from "../subscribable";
import { cloneDeep as _cloneDeep } from "../util";
import { observe, observable, batch } from "alo";
import { PauseObserverFn } from "alo";
import isPlainObject from "lodash/isPlainObject";

export var actionTypes = {
  INIT: "@@init",
};

export class Store<T extends MutatorInterface = MutatorInterface>
  implements StoreInterface {
  _isMutating: boolean;
  _observable: {
    state: any;
  } = observable({
    state: null,
  });
  _action: Action;
  _mutator: MutatorInterface;
  _actionNormalizer: ActionNormalizerInterface;
  _actionResolver: ActionResolverInterface;
  _subscribable: SubscribableInterface<Store<ReturnType<T["createState"]>>>;
  _cloneDeep: typeof _cloneDeep;
  _pureByDefault: boolean;

  constructor({
    mutator,
    actionNormalizer = new ActionNormalizer(),
    actionResolver = new ActionResolver(),
    subscribable = new Subscribable(),
    cloneDeep = _cloneDeep,
    pureByDefault = false,
  }: {
    mutator: T;
    actionNormalizer?: ActionNormalizerInterface;
    actionResolver?: ActionResolverInterface;
    subscribable?: SubscribableInterface<Store<ReturnType<T["createState"]>>>;
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
        impure: true,
      },
      payload: this._mutator.createState(),
    });
  }

  /**
   * Returns the current state
   */
  getState = (): ReturnType<T["createState"]> => {
    return this._observable.state;
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

  setSubscribable(
    subscribable: SubscribableInterface<Store<ReturnType<T["createState"]>>>
  ) {
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
      action: action as Action,
      callBack: this._afterDispatchNormalization,
      store: this,
    });
  };

  observe(func: (store: this, pauseObserverFn: PauseObserverFn) => any) {
    return observe((pauseObserverFn) => {
      func(this, pauseObserverFn);
    });
  }

  _callSubscribers = () => {
    this._subscribable.callSubscribers(this);
  };

  _afterDispatchNormalization: NormalizeOptions["callBack"] = (action) => {
    return this._actionResolver.resolve({
      action: action,
      store: this,
      setAction: this._setAction,
      callSubscribers: this._callSubscribers,
      applyMutator: this._applyMutator,
    });
  };

  _applyMutatorBatch(action: Action) {
    const isInitAction = action.type === actionTypes.INIT;

    if (isInitAction) {
      this._observable.state = isPlainObject(action.payload)
        ? observable(action.payload)
        : action.payload;
    }

    try {
      let result = this._mutator.mutate(
        this._observable.state,
        action,
        "state",
        this._observable
      );
      // TODO: Maybe this should only happen if the user wants to use observables? Option-worthy?
      if (isInitAction && isPlainObject(result)) {
        result = observable(result);
      }
      this._observable.state = result;
    } catch (err) {
      console.error(err);
    }
  }

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

    batch(() => {
      this._applyMutatorBatch(action);
    });

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
