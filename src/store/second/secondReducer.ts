import { secondLens, rootReducer } from "../store";
import { createSubReducer } from "../../index";
import { State } from "../state";
import { Second } from "./secondState";

export const secondReducer = createSubReducer<Second, State>(rootReducer)(secondLens, [
  s => console.log("secondReducer", s)
]);
