import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Flight, TravelApiResponse } from '../../types/travel';
import config from '../../config';
import { setFlights, setTab } from './travelSlice';

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
                    console.log("Travel API Response:", data);
                    const flights = data.response.flights as Flight[];
                    const tab = data.response.tab;
                    dispatch(setTab(tab));
                    dispatch(setFlights(flights));
                } catch { }
            }
        }),
    }),
});

export const { useChatWithAssistantMutation } = travelApi;
