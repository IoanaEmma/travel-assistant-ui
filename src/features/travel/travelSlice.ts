import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Attraction, Conversation, Flight, Hotel, TravelApiResponse } from '../../types/travel';

interface TravelUIState {
    tab: string;
    foundFlights: Flight[];
    hotels: Hotel[];
    attractions: Attraction[];
    assistantResponse: string;
    conversationHistory: Conversation[];
}

const initialState: TravelUIState = {
    tab: "chat",
    foundFlights: [],
    hotels: [],
    attractions: [],
    assistantResponse: '',
    conversationHistory: []
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
        },
        setAssistantResponse(state, action: PayloadAction<string>) {
            state.assistantResponse = action.payload;
        },
        clearAssistantResponse: (state) => {
            state.assistantResponse = '';
        },
        setConversation(state, action: PayloadAction<Conversation[]>) {
            state.conversationHistory = action.payload;
        },
    }
});

export const { setFlights, setHotels, setTab, setAttractions, setAssistantResponse, clearAssistantResponse, setConversation } = travelSlice.actions;
export default travelSlice.reducer;