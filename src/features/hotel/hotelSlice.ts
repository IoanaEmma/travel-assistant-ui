import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HotelDetails } from '../../types/travel';

interface HotelState {
    hotelDetails: HotelDetails | null;
}

const initialState: HotelState = {
    hotelDetails: null,
}

const hotelSlice = createSlice({
    name: 'hotel',
    initialState,
    reducers: {
        setHotelDetails(state, action: PayloadAction<HotelDetails>) {
            state.hotelDetails = action.payload;
        },
        clearHotelDetails(state) {
            state.hotelDetails = null;
        }
    }
});

export const { setHotelDetails, clearHotelDetails } = hotelSlice.actions;
export default hotelSlice.reducer;