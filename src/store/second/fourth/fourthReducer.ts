
import { createSubReducer } from '../../../index'
import { State } from '../../state'
import { rootReducer } from '../../store'
import { fourthLens } from '../secondLenses'
import { renderFourth } from './fourthRender'
import { Fourth } from './fourthState'

const changeTitle = (title: string) => (state: Fourth): Fourth => ({...state, title})

const changeAge = (age: number) => (state: Fourth): Fourth => ({...state, age})

export const fourthReducer = createSubReducer<Fourth, State>(rootReducer)(
  fourthLens,
  [s => console.log(renderFourth(s))]
);

export const actions = {
	changeTitle: (title: string) => fourthReducer.modify(changeTitle(title)),
	changeAge: (age: number) => fourthReducer.modify(changeAge(age)),
	incrementAge: () => fourthReducer.modify(s => ({...s, age: s.age + 1}))
}
