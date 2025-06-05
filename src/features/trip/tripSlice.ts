import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Trip, TripDetails } from '../../types/travel';

interface TripState {
    trips: Trip[];
    selectedTrip: TripDetails | null;
}

const initialState: TripState = {
    trips: [],
    selectedTrip: null,
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
        setSelectedTrip(state, action: PayloadAction<TripDetails | null>) {
            console.log("Setting selected trip:", action.payload);
            state.selectedTrip = action.payload;
        },
    }
});

export const { setTrips, addTrip, setSelectedTrip } = tripSlice.actions;
export default tripSlice.reducer;