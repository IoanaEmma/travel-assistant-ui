import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Flight, TravelApiResponse } from '../../types/travel';
import config from '../../config';
import { setFlights, setTab, setHotels } from './travelSlice';

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
                        const hotels = data.response.hotels;
                        dispatch(setHotels(hotels));
                    }
                } catch { }
            }
        }),
    }),
});

export const { useChatWithAssistantMutation } = travelApi;
