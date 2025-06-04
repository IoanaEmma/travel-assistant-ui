import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Trip } from '../../types/travel';
import config from '../../config';
import { setTrips, addTrip } from './tripSlice';

export const tripApi = createApi({
    reducerPath: 'tripApi',
    baseQuery: fetchBaseQuery({ baseUrl: config.API_URL }),
    endpoints: (builder) => ({
        getTrips: builder.query<Trip[], string>({ // string = userId
            query: (userId) => ({
                url: `/trip/${userId}`,
                method: 'GET',
            }),
            async onQueryStarted(userId, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data) {
                        setTrips(data);
                    }
                } catch (error) {
                    console.error('Failed to fetch trips:', error);
                }
            }
        }),
        createTrip: builder.mutation<Trip, Partial<Trip>>({
            query: (newTrip) => ({
                url: '/trip',
                method: 'POST',
                body: newTrip,
            }),
            async onQueryStarted(newTrip, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data) {
                        addTrip(data);
                    }
                } catch (error) {
                    console.error('Failed to create trip:', error);
                }
            }
        })
    }),
});

export const { useGetTripsQuery } = tripApi;