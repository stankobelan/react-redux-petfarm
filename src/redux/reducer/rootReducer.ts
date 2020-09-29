import { combineReducers } from '@reduxjs/toolkit'
import farms from './farmSlice'
import pets from './petsSlice'
import createFarmSlice from './createFarmSlice'
import calcFarmSlice from './calcFarmSlice'

const rootReducer = combineReducers({
    farms,
    pets,
    createFarmSlice,
    calcFarmSlice
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
