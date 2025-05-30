import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Attraction, Flight, Hotel, TravelApiResponse } from '../../types/travel';

interface TravelUIState {
    tab: string;
    foundFlights: Flight[];
    hotels: Hotel[];
    attractions: Attraction[];
}

const initialState: TravelUIState = {
    tab: "chat",
    foundFlights: [],
    hotels: [],
    attractions: []
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
        setAttractions(state, action: PayloadAction<Attraction[]>) {
            state.attractions = action.payload;
        },
        setTab(state, action: PayloadAction<string>) {
            state.tab = action.payload;
        }
    }
});

export const { setFlights, setHotels, setTab, setAttractions } = travelSlice.actions;
export default travelSlice.reducer;