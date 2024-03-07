import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

const rootReducer = combineReducers({
//   [pokemonApi.reducerPath]: pokemonApi.reducer,
})

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
        // pokemonApi.middleware
    ]),
})

setupListeners(store.dispatch)