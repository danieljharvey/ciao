import { rootReducer } from '../../store'
import { thirdLens } from '../secondLenses'
import { createSubReducer } from '../../../index'
import { State } from '../../state'
import { Third } from './thirdState'

export const thirdReducer = createSubReducer<Third, State>(rootReducer)(thirdLens, [
  s => console.log("thirdReducer", s)
]);