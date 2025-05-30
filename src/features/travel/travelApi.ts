import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Attraction, Flight, Hotel, TravelApiResponse } from '../../types/travel';
import config from '../../config';
import { setFlights, setTab, setHotels, setAttractions } from './travelSlice';

export const travelApi = createApi({
    reducerPath: 'travelApi',
    baseQuery: fetchBaseQuery({ baseUrl: config.API_URL }),
    endpoints: (builder) => ({
        chatWithAssistant: builder.mutation<TravelApiResponse, string>({
            query: (userMessage) => ({
                url: '/chat',
                method: 'POST',
                body: { userMessage },
            }),
            async onQueryStarted(_userMessage, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const tab = data.response.tab;
                    dispatch(setTab(tab));

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
                } catch { }
            }
        }),
    }),
});

export const { useChatWithAssistantMutation } = travelApi;
