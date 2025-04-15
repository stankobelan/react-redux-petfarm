import { combineReducers } from '@reduxjs/toolkit';
import farmsReducer from './farmSlice';
import petsReducer from './petsSlice';
import farmFormReducer from './createFarmSlice';
import farmCalculationReducer from './calcFarmSlice';
import commonReducer from './commonSlice';

/**
 * Root reducer that combines all feature reducers
 * Each reducer is responsible for a specific slice of the state
 */
const rootReducer = combineReducers({
  farms: farmsReducer,
  pets: petsReducer,
  farmForm: farmFormReducer,
  farmCalculation: farmCalculationReducer,
  common: commonReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
