import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Hotel, HotelDetails } from '../../types/travel';

interface HotelState {
    hotelDetails: HotelDetails | null;
    currentHotel: Hotel | null;
}

const initialState: HotelState = {
    hotelDetails: null,
    currentHotel: null,
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
        },
        setCurrentHotel(state, action: PayloadAction<Hotel | null>) {
            state.currentHotel = action.payload;
        }
    }
});

export const { setHotelDetails, clearHotelDetails, setCurrentHotel } = hotelSlice.actions;
export default hotelSlice.reducer;