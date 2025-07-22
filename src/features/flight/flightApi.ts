import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Flight } from '../../types/travel';
import config from '../../config';
import { selectFlight } from './flightSlice';

export const flightApi = createApi({
    reducerPath: 'flightApi',
    baseQuery: fetchBaseQuery({ baseUrl: config.API_URL }),
    endpoints: (builder) => ({
        createFlight: builder.mutation<Flight, Partial<Flight>>({
            query: (newFlight) => ({
                url: '/flight',
                method: 'POST',
                body: newFlight,
            }),
            async onQueryStarted(newFlight, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data) {
                        selectFlight(data);
                    }
                } catch (error) {
                    console.error('Failed to create flight:', error);
                }
            }
        }),
    }),
});

export const { useCreateFlightMutation } = flightApi;