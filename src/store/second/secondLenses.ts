import { secondLens, rootReducer } from '../store'
import { createSubReducer, createLens, composeLenses } from '../../index'
import { State } from '../state'
import { Second } from './secondState'
import { Fourth } from './fourth/fourthState'
import { Third } from './third/thirdState'

export const thirdLens = composeLenses<Third, Second, State>(secondLens)(createLens(
  state => state.third,
  value => state => ({
    ...state,
    third: value
  })
))

export const fourthLens = composeLenses<Fourth, Second, State>(secondLens)(createLens(
  state => state.fourth,
  value => state => ({
    ...state,
    fourth: value
  })
))