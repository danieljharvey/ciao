import { actions, fourthReducer } from './store/second/fourth'

actions.changeTitle('horse')
actions.changeTitle('horse1')
actions.changeTitle('horse3')
actions.changeTitle('horse4')

actions.changeAge(101)

actions.incrementAge()

fourthReducer.get()