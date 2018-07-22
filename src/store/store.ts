import {
  createRootReducer,
  createSubReducer,
  composeLenses,
  createLens
} from "../index";

import { initialState, State } from './state'
import { Second } from './second'

export const firstLens = createLens<number, State>(
  state => state.first,
  value => state => ({
    ...state,
    first: value
  })
);

export const secondLens = createLens<Second, State>(
  state => state.second,
  value => state => ({
    ...state,
    second: value
  })
);

export const rootReducer = createRootReducer(initialState, [
  console.dir
]);

