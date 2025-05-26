import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Flight, TravelApiResponse } from '../../types/travel';

interface TravelUIState {
    tab: string;
    foundFlights: Flight[];
}

const initialState: TravelUIState = {
    tab: "chat",
    foundFlights: []
};

const travelSlice = createSlice({
    name: 'travel',
    initialState,
    reducers: {
        setFlights(state, action: PayloadAction<Flight[]>) {
            state.foundFlights = action.payload;
        },
        setTab(state, action: PayloadAction<string>) {
            state.tab = action.payload;
        }
    }
});

export const { setFlights, setTab } = travelSlice.actions;
export default travelSlice.reducer;