import { combineReducers } from '@reduxjs/toolkit'
import farms from './farmSlice'
import pets from './petsSlice'

const rootReducer = combineReducers({
    farms,
    pets
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
