import { combineReducers } from '@reduxjs/toolkit'
import farms from './farmSlice'
import pets from './petsSlice'
import createFarmSlice from './createFarmSlice'

const rootReducer = combineReducers({
    farms,
    pets,
    createFarmSlice
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
