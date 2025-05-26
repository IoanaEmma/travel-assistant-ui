import { configureStore } from '@reduxjs/toolkit';
import travelReducer from '../features/travel/travelSlice';
import { travelApi } from '../features/travel/travelApi';

export const store = configureStore({
    reducer: {
        travel: travelReducer,
        [travelApi.reducerPath]: travelApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(travelApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;