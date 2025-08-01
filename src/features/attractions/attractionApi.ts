import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Attraction } from '../../types/travel';
import config from '../../config';
import { setSavedAttractions, setAttractionCities } from './attractionSlice';

export const attractionApi = createApi({
    reducerPath: 'attractionApi',
    baseQuery: fetchBaseQuery({ baseUrl: config.API_URL }),
    tagTypes: ['Attractions', 'Cities'],
    endpoints: (builder) => ({
        createAttraction: builder.mutation<Attraction, Partial<Attraction>>({
            query: (newAttraction) => ({
                url: '/attraction',
                method: 'POST',
                body: newAttraction,
            }),
            invalidatesTags: ["Attractions", 'Cities']
        }),
        getAttractionsByCity: builder.query<Attraction[], string | undefined>({
            query: (city) => ({
                url: city ? `/attraction?city=${city}` : '/attraction',
                method: 'GET',
            }),
            providesTags: ["Attractions"],
            async onQueryStarted(city, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data) {
                        setSavedAttractions(data);
                    }
                } catch (error) {
                    console.error('Failed to fetch attractions:', error);
                }

            }
        }),
        getAttractionCities: builder.query<string[], void>({
            query: () => ({
                url: '/attraction/cities',
                method: 'GET',
            }),
            providesTags: ["Cities"],
            async onQueryStarted(_, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data) {
                        setAttractionCities(data);
                    }
                } catch (error) {
                    console.error('Failed to fetch attraction cities:', error);
                }
            }
        }),
        deleteAttraction: builder.mutation<void, number>({
            query: (id) => ({
                url: `/attraction/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Attractions", 'Cities']
        })
    }),
});

export const {
    useCreateAttractionMutation,
    useGetAttractionsByCityQuery,
    useLazyGetAttractionsByCityQuery,
    useGetAttractionCitiesQuery,
    useDeleteAttractionMutation
} = attractionApi;