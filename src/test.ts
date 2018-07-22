import { actions, fourthReducer } from './store/second/fourth/fourthReducer'
import { actions as thirdActions } from './store/second/third/thirdReducer'

actions.changeTitle('horse')
actions.changeTitle('horse1')
actions.changeTitle('horse3')
actions.changeTitle('horse4')

actions.changeAge(101)

actions.incrementAge()

console.warn(fourthReducer.get())

thirdActions.addFart()
thirdActions.addFart()
thirdActions.addFart()
thirdActions.addFart()
thirdActions.addFart()