import { thirdState, Third } from './third'
import { fourthState, Fourth } from './fourth'

export interface Second {
  third: Third;
  fourth: Fourth;
}

export const secondState: Second = {
    third: thirdState,
    fourth: fourthState
}