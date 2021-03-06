import { createRootReducer, createLens } from "../index";

import { initialState, State } from "./state";
import { Second } from "./second/secondState";

export const rootReducer = createRootReducer(initialState, [console.dir]);

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
