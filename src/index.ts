
type StateFace = number

type Action = { type: string }

type Reducer<T> = (state: T, action: Action) => T

const reducer1: Reducer<number> = (state, action) => action.type === 'reducer1' ? state + 1 : state

const reducer2: Reducer<number> = (state, action) => action.type === 'reducer2' ? state + 1 : state

    /*
const root = {
    reducer1,
    reducer2
}*/

const reducerContext = <T>(initialState: T, reducer: Reducer<T>) => {
    
    let state = initialState;

    const getState = () => state

    const setState = (newState: T) => {
        state = newState
    }

    return {
        getState,
        setState
    }
}

const context = reducerContext(10, reducer1)

console.log('getState', context.getState())

context.setState(11)

console.log('getState', context.getState())




