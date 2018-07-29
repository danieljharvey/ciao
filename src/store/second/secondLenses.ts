import { createLens } from "../../index";
import { secondReducer } from "./secondReducer";

export const thirdLens = secondReducer.compose(
  createLens(
    state => state.third,
    value => state => ({
      ...state,
      third: value
    })
  )
);

export const fourthLens = secondReducer.compose(
  createLens(
    state => state.fourth,
    value => state => ({
      ...state,
      fourth: value
    })
  )
);
