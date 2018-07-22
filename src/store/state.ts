import { firstState } from './first/firstState'
import { secondState } from './second/secondState'
import { Second } from './second/secondState'

export interface State {
  first: number;
  second: Second;
}

export const initialState: State = {
  first: firstState,
  second: secondState
}