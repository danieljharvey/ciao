interface Second {
    third: string
}

interface State {
    first: number
    second: Second
}

const initialState: State = {
    first: 1,
    second: {
        third: "yes"
    }
}

interface RootReducerFunc<S> { 
    get: () => S
    set: (newState: S) => S
    modify: (f: Map<S>) => S
}

type RootReducer<S> = (initialState: S) => RootReducerFunc<S>

type Listener<S> = (state: S) => void

const reducer = <S>(initialState: S, listeners: Listener<S>[] = []): RootReducerFunc<S> => {
    let state: S = initialState

    const get = () => state

    const set = (newState: S) => {
        state = newState
        notify(state)
        return state
    }

    const modify = (f: Map<S>) => {
        return set(f(state))
    }

    const notify = (state: S) => listeners.map(listener => listener(state))

    return {
        get,
        set,
        modify
    }
}

type Get<A, S> = (state: S) => A

type Set<A, S> = (value: A) => (state: S) => S

interface Lens<A, S> {
    get: Get<A, S>
    set: Set<A, S>
}

type Map<A> = (value: A) => A

const getFirst: Get<number, State> = (state) => state.first

const setFirst: Set<number, State> = (value) => (state) => ({ ...state, first: value })

const getSecond: Get<Second, State> = (state) => state.second

const setSecond: Set<Second, State> = (value) => (state) => ({ ...state, second: value })

const getThird: Get<string, Second> = (state) => state.third

const setThird: Set<string, Second> = (value) => (state) => ({ ...state, third: value })

const firstLens: Lens<number, State> = { get: getFirst, set: setFirst }

const secondLens: Lens<Second, State> = { get: getSecond, set: setSecond }

const thirdLens: Lens<string, Second> = { get: getThird, set: setThird }

// are we using these
const get = <A, S>(lens: Lens<A, S>) => (state: S): A => lens.get(state)

const set = <A, S>(lens: Lens<A, S>) => (value: A) => (state: S) => lens.set(value)(state)

const modify = <A, S>(lens: Lens<A, S>) => (func: Map<A>) => (state: S): S => {
    const newValue = func(lens.get(state))
    return lens.set(newValue)(state)
}

// yeah
const double = (i: number)  => i * 2

const exclaim = (x: string) => x + "!!!"


const makeReducerLenser = <A, S>(rootReducer: RootReducerFunc<S>) => (lens: Lens<A, S>, listeners: Listener<A>[] = []) => {

    const get = () => lens.get(rootReducer.get())

    const set = (value: A) => {
        notify(value)
        return rootReducer.set(lens.set(value)(rootReducer.get()))
    }

    const modify = (func: Map<A>) => set(func(get()))

    const notify = (value: A) => listeners.map(s => s(value))

    return { get, set, modify }
}

const composeLenses = <A, B, S>(lens1: Lens<B, S>) => (lens2: Lens<A, B>): Lens<A, S> => ({
    get: (state: S) => lens2.get(lens1.get(state)),
    set: (value: A) => (state: S) => {
        const newValue = lens2.set(value)(lens1.get(state))
        return lens1.set(newValue)(state)
    }
})

const fullThreeLens = composeLenses<string, Second, State>(secondLens)(thirdLens)

console.log(fullThreeLens.get(initialState))

console.log(fullThreeLens.set('dog')(initialState))

const rootReducer = reducer(initialState, [s => console.warn('rootReducer', s)])

const firstReducerLens = makeReducerLenser<number, State>(rootReducer)(firstLens, [s => console.log('firstReducer', s)])

const threeReducerLens = makeReducerLenser<string, State>(rootReducer)(fullThreeLens, [s => console.log('thirdReducer', s)])

firstReducerLens.set(10)
firstReducerLens.modify(double)
threeReducerLens.modify(exclaim)

console.log('all', rootReducer.get())



