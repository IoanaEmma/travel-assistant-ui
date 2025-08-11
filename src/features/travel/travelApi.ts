import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Attraction, Flight, Hotel, TravelApiResponse, Conversation } from '../../types/travel';
import config from '../../config';
import { setFlights, setTab, setHotels, setAttractions, setAssistantResponse, setConversation } from './travelSlice';

export const travelApi = createApi({
    reducerPath: 'travelApi',
    baseQuery: fetchBaseQuery({ baseUrl: config.API_URL }),
    endpoints: (builder) => ({
        chatWithAssistant: builder.mutation<TravelApiResponse, { currentMessage: string; conversationHistory: Conversation[] }>({
            query: ({ currentMessage, conversationHistory }) => ({
                url: '/chat',
                method: 'POST',
                body: { userMessage: currentMessage, conversationHistory }
            }),
            async onQueryStarted({ currentMessage, conversationHistory }, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const tab = data.response.tab;
                    const conversationHistory = data.conversationHistory || [];
                    dispatch(setTab(tab));
                    dispatch(setConversation(conversationHistory));

                    if (Object.prototype.hasOwnProperty.call(data.response, 'flights')) {
                        const flights = data.response.flights as Flight[];
                        dispatch(setFlights(flights));
                    }

                    if (Object.prototype.hasOwnProperty.call(data.response, 'hotels')) {
                        const hotels = data.response.hotels as Hotel[];
                        dispatch(setHotels(hotels));
                    }

                    if (Object.prototype.hasOwnProperty.call(data.response, 'attractions')) {
                        const attractions = data.response.attractions as Attraction[];
                        dispatch(setAttractions(attractions));
                    }

                    if (typeof data.response === 'string') {
                        
                        dispatch(setAssistantResponse(data.response));
                    }
                } catch {
                    dispatch(setAssistantResponse("I'm not really in the mood to talk right now. Let's try again later."));
                }
            }
        }),
    }),
});

export const { useChatWithAssistantMutation } = travelApi;
