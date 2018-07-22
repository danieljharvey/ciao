export interface RootReducerFunc<S> {
  get: () => S;
  set: (newState: S) => S;
  modify: (f: Map<S>) => S;
}

export type Get<A, S> = (state: S) => A;

export type Set<A, S> = (value: A) => (state: S) => S;

export interface Lens<A, S> {
  get: Get<A, S>;
  set: Set<A, S>;
}

export const createLens = <A, S>(
  getter: Get<A, S>,
  setter: Set<A, S>
): Lens<A, S> => ({
  get: getter,
  set: setter
});

type Map<A> = (value: A) => A;

type Listener<S> = (state: S) => void;

export const createRootReducer = <S>(
  initialState: S,
  listeners: Listener<S>[] = []
): RootReducerFunc<S> => {
  let state: S = initialState;

  const get = () => state;

  const set = (newState: S) => {
    state = newState;
    notify(state);
    return state;
  };

  const modify = (f: Map<S>) => {
    return set(f(state));
  };

  const notify = (state: S) => listeners.map(listener => listener(state));

  return {
    get,
    set,
    modify
  };
};

export const createSubReducer = <A, S>(rootReducer: RootReducerFunc<S>) => (
  lens: Lens<A, S>,
  listeners: Listener<A>[] = []
) => {
  const get = () => lens.get(rootReducer.get());

  const set = (value: A) => {
    notify(value);
    return rootReducer.set(lens.set(value)(rootReducer.get()));
  };

  const modify = (func: Map<A>) => set(func(get()));

  const notify = (value: A) => listeners.map(s => s(value));

  return { get, set, modify };
};

export const composeLenses = <A, B, S>(lens1: Lens<B, S>) => (
  lens2: Lens<A, B>
): Lens<A, S> => ({
  get: (state: S) => lens2.get(lens1.get(state)),
  set: (value: A) => (state: S) => {
    const newValue = lens2.set(value)(lens1.get(state));
    return lens1.set(newValue)(state);
  }
});
