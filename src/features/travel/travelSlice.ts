import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Flight, Hotel, TravelApiResponse } from '../../types/travel';

interface TravelUIState {
    tab: string;
    foundFlights: Flight[];
    hotels: Hotel[];
}

const initialState: TravelUIState = {
    tab: "chat",
    foundFlights: [],
    hotels: []
};

const travelSlice = createSlice({
    name: 'travel',
    initialState,
    reducers: {
        setFlights(state, action: PayloadAction<Flight[]>) {
            state.foundFlights = action.payload;
        },
        setHotels(state, action: PayloadAction<Hotel[]>) {
            state.hotels = action.payload;
        },
        setTab(state, action: PayloadAction<string>) {
            state.tab = action.payload;
        }
    }
});

export const { setFlights, setHotels, setTab } = travelSlice.actions;
export default travelSlice.reducer;