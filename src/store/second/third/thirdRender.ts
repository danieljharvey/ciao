import { Third } from './thirdState'

const exclaim = (x: string) => x + "!!!!!!!!!!!!!"

export const renderThird = (state: Third): string => state.thumbs.map(exclaim).join('\n')