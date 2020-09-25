import {
    configureStore,
    Action
} from '@reduxjs/toolkit'
import {ThunkAction} from 'redux-thunk'

import logger from 'redux-logger'
import rootReducer, {RootState} from '../reducer/rootReducer'




const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(logger)
})

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('../reducer/rootReducer', () => {
        const newRootReducer = require('../reducer/rootReducer').default
        store.replaceReducer(newRootReducer)
    })
}

export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>

export default store
