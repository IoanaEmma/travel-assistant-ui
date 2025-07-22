import { configureStore } from '@reduxjs/toolkit';
import travelReducer from '../features/travel/travelSlice';
import { travelApi } from '../features/travel/travelApi';
import hotelReducer from '../features/hotel/hotelSlice';
import { hotelApi } from '../features/hotel/hotelApi';
import tripReducer from '../features/trip/tripSlice';
import { tripApi } from '../features/trip/tripApi';
import flightReducer from '../features/flight/flightSlice';
import { flightApi } from '../features/flight/flightApi';
import attractionReducer from '../features/attractions/attractionSlice';
import { attractionApi } from '../features/attractions/attractionApi';

export const store = configureStore({
    reducer: {
        travel: travelReducer,
        [travelApi.reducerPath]: travelApi.reducer,
        hotel: hotelReducer,
        [hotelApi.reducerPath]: hotelApi.reducer,
        trip: tripReducer,
        [tripApi.reducerPath]: tripApi.reducer,
        flight: flightReducer,
        [flightApi.reducerPath]: flightApi.reducer,
        attraction: attractionReducer,
        [attractionApi.reducerPath]: attractionApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(travelApi.middleware, hotelApi.middleware,
            tripApi.middleware, flightApi.middleware, attractionApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;