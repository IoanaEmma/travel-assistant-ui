import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Trip, TripDetails, TripItem } from '../../types/travel';
import config from '../../config';
import { setTrips, addTrip, setSelectedTrip } from './tripSlice';

export const tripApi = createApi({
    reducerPath: 'tripApi',
    baseQuery: fetchBaseQuery({ baseUrl: config.API_URL }),
    tagTypes: ['Trips'],
    endpoints: (builder) => ({
        getTrips: builder.query<Trip[], string>({ // string = userId
            query: (userId) => ({
                url: `/trip/${userId}`,
                method: 'GET',
            }),
            providesTags: ["Trips"],
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
        getTripDetails: builder.query<TripDetails, { userId: string; tripId: string }>({
            query: ({ userId, tripId }) => ({
                url: `/trip/${userId}/${tripId}`,
                method: 'GET',
            })
        }),
        createTrip: builder.mutation<Trip, Partial<Trip>>({
            query: (newTrip) => ({
                url: '/trip',
                method: 'POST',
                body: newTrip,
            }),
            invalidatesTags: ["Trips"],
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
        }),
        updateTrip: builder.mutation<Trip, Partial<Trip>>({
            query: (updatedTrip) => ({
                url: `/trip/update/${updatedTrip.id}`,
                method: 'PUT',
                body: updatedTrip,
            }),
            invalidatesTags: ["Trips"]
        }),
        addItemToTrip: builder.mutation<Trip, { tripId: string; item: TripItem }>({
            query: ({ tripId, item }) => ({
                url: `/trip/add-item/${tripId}`,
                method: 'PUT',
                body: item,
            }),
            invalidatesTags: ["Trips"]
        }),
        deleteTrip: builder.mutation<void, { tripId: string }>({
            query: ({ tripId }) => ({
                url: `/trip/${tripId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Trips"],
        })
    })
});


export const {
    useGetTripsQuery,
    useGetTripDetailsQuery,
    useLazyGetTripDetailsQuery, // <-- add this line
    useCreateTripMutation,
    useUpdateTripMutation,
    useAddItemToTripMutation,
    useDeleteTripMutation
} = tripApi;