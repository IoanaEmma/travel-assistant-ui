import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Flight } from '../../types/travel';

interface FlightState {
    selectedFlight: Flight | null;
}

const initialState: FlightState = {
    selectedFlight: null,
};

const flightSlice = createSlice({
    name: 'flight',
    initialState,
    reducers: {
        selectFlight: (state, action: PayloadAction<Flight>) => {
            state.selectedFlight = action.payload;
        }
    },
});

export const { selectFlight } = flightSlice.actions;

export default flightSlice.reducer;