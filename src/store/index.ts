import { configureStore } from '@reduxjs/toolkit';
import travelReducer from '../features/travel/travelSlice';
import { travelApi } from '../features/travel/travelApi';
import hotelReducer from '../features/hotel/hotelSlice';
import { hotelApi } from '../features/hotel/hotelApi';

export const store = configureStore({
    reducer: {
        travel: travelReducer,
        [travelApi.reducerPath]: travelApi.reducer,
        hotel: hotelReducer,
        [hotelApi.reducerPath]: hotelApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(travelApi.middleware, hotelApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;