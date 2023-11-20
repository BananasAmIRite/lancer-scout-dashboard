import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { ScoutAPI } from './services/scout';

export const store = configureStore({
    reducer: {
        [ScoutAPI.reducerPath]: ScoutAPI.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ScoutAPI.middleware),
});

setupListeners(store.dispatch);
