import { firstLens, rootReducer } from '../store'
import { createSubReducer } from '../../index'
import { State } from '../state'

export const firstReducer = createSubReducer<number, State>(rootReducer)(firstLens, [
  s => console.log("firstReducer", s)
]);