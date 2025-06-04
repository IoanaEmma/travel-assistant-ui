import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Trip } from '../../types/travel';

interface TripState {
    trips: Trip[];
}

const initialState: TripState = {
    trips: [],
}

const tripSlice = createSlice({
    name: 'trip',
    initialState,
    reducers: {
        setTrips(state, action: PayloadAction<Trip[]>) {
            state.trips = action.payload;
        },
        addTrip(state, action: PayloadAction<Trip>) {
            state.trips.push(action.payload);
        },
    }
});

export const { setTrips, addTrip } = tripSlice.actions;
export default tripSlice.reducer;