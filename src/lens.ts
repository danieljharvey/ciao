import {
  createRootReducer,
  createSubReducer,
  composeLenses,
  createLens
} from "./index";
interface Fourth {
  title: string;
  age: number;
}

interface Second {
  third: string;
  fourth: Fourth;
}

interface State {
  first: number;
  second: Second;
}

const initialState: State = {
  first: 1,
  second: {
    third: "yes",
    fourth: {
      title: "Senor Ouvo",
      age: 100
    }
  }
};

const firstLens = createLens<number, State>(
  state => state.first,
  value => state => ({
    ...state,
    first: value
  })
);

const secondLens = createLens<Second, State>(
  state => state.second,
  value => state => ({
    ...state,
    second: value
  })
);

const thirdLens = createLens<string, Second>(
  state => state.third,
  value => state => ({
    ...state,
    third: value
  })
);

const fourthLens = createLens<Fourth, Second>(
  state => state.fourth,
  value => state => ({
    ...state,
    fourth: value
  })
);

const titleLens = createLens<string, Fourth>(
  state => state.title,
  value => state => ({ ...state, title: value })
);

const ageLens = createLens<number, Fourth>(
  state => state.age,
  value => state => ({ ...state, age: value })
);

// yeah
const double = (i: number) => i * 2;

const exclaim = (x: string) => x + "!!!";

const fullThreeLens = composeLenses<string, Second, State>(secondLens)(
  thirdLens
);

const fullFourthLens = composeLenses<Fourth, Second, State>(secondLens)(
  fourthLens
);

const fullTitleLens = composeLenses<string, Fourth, State>(fullFourthLens)(
  titleLens
);

const fullAgeLens = composeLenses<number, Fourth, State>(fullFourthLens)(
  ageLens
);

const rootReducer = createRootReducer(initialState, [
  s => console.warn("rootReducer", s)
]);

const firstReducer = createSubReducer<number, State>(rootReducer)(firstLens, [
  s => console.log("firstReducer", s)
]);

const threeReducerLens = createSubReducer<string, State>(rootReducer)(
  fullThreeLens,
  [s => console.log("thirdReducer", s)]
);

const fullTitleReducer = createSubReducer<string, State>(rootReducer)(
  fullTitleLens
);

const fullAgeReducer = createSubReducer<number, State>(rootReducer)(
  fullAgeLens
);

firstReducer.set(10);
firstReducer.modify(double);
threeReducerLens.modify(exclaim);
fullTitleReducer.modify(str => str.toUpperCase());
fullAgeReducer.modify(double);
