import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Flight } from '../../types/travel';
import config from '../../config';
import { selectFlight } from './flightSlice';

export const flightApi = createApi({
    reducerPath: 'flightApi',
    baseQuery: fetchBaseQuery({ baseUrl: config.API_URL }),
    tagTypes: ['Flights', 'Cities'],
    endpoints: (builder) => ({
        createFlight: builder.mutation<Flight, Partial<Flight>>({
            query: (newFlight) => ({
                url: '/flight',
                method: 'POST',
                body: newFlight,
            }),
            invalidatesTags: ["Flights", "Cities"],
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
        getFlightsByCity: builder.query<Flight[], string | undefined>({
            query: (city) => ({
                url: city ? `/flight?city=${city}` : '/flight',
            }),
            providesTags: ["Flights"],
        }),
        getFlightCities: builder.query<string[], void>({
            query: () => ({
                url: '/flight/cities',
            }),
            providesTags: ["Cities"],
        }),
        deleteFlight: builder.mutation<void, number>({
            query: (id) => ({
                url: `/flight/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Flights", "Cities"]
        })
    })
});

export const { useCreateFlightMutation, useGetFlightCitiesQuery, useGetFlightsByCityQuery } = flightApi;