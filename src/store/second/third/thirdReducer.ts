import { rootReducer } from '../../store'
import { thirdLens } from '../secondLenses'
import { createSubReducer } from '../../../index'
import { State } from '../../state'
import { Third } from './thirdState'
import { renderThird } from './thirdRender'

export const thirdReducer = createSubReducer<Third, State>(rootReducer)(thirdLens, [
  s => console.log(renderThird(s))
]);

const addFart = () => (third: Third): Third => ({ ...third, thumbs: third.thumbs.concat("fart") })

export const actions = {
	addFart: () => thirdReducer.modify(addFart())
}