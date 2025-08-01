import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Attraction } from '../../types/travel';

interface AttractionState {
    selectedAttraction: Attraction | null;
    savedAttractions: Attraction[];
    cities: string[];
}

const initialState: AttractionState = {
    selectedAttraction: null,
    savedAttractions: [],
    cities: [],
};

const attractionSlice = createSlice({
    name: 'attraction',
    initialState,
    reducers: {
        selectAttraction: (state, action: PayloadAction<Attraction>) => {
            state.selectedAttraction = action.payload;
        },
        setSavedAttractions: (state, action: PayloadAction<Attraction[]>) => {
            state.savedAttractions = action.payload;
        },
        setAttractionCities: (state, action: PayloadAction<string[]>) => {
            state.cities = action.payload;
        }
    },
});

export const { selectAttraction, setSavedAttractions, setAttractionCities } = attractionSlice.actions;

export default attractionSlice.reducer;