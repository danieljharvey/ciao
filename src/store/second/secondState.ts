import { thirdState, Third } from './third/thirdState'
import { fourthState, Fourth } from './fourth/fourthState'

export interface Second {
  third: Third;
  fourth: Fourth;
}

export const secondState: Second = {
    third: thirdState,
    fourth: fourthState
}