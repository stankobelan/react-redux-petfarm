import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import rootReducer from '../reducer/rootReducer';

/**
 * Configure Redux store with root reducer
 * Development environment gets Redux logger middleware
 */
const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    process.env.NODE_ENV === 'development'
      ? getDefaultMiddleware().concat(require('redux-logger').default)
      : getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

// Enable hot module replacement for reducers in development
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('../reducer/rootReducer', () => {
    const newRootReducer = require('../reducer/rootReducer').default;
    store.replaceReducer(newRootReducer);
  });
}

// Export store types for better TypeScript integration
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create typed hooks for using throughout the application
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
