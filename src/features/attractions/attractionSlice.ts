import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Attraction } from '../../types/travel';

interface AttractionState {
    selectedAttraction: Attraction | null;
}

const initialState: AttractionState = {
    selectedAttraction: null,
};

const attractionSlice = createSlice({
    name: 'attraction',
    initialState,
    reducers: {
        selectAttraction: (state, action: PayloadAction<Attraction>) => {
            state.selectedAttraction = action.payload;
        }
    },
});

export const { selectAttraction } = attractionSlice.actions;

export default attractionSlice.reducer;