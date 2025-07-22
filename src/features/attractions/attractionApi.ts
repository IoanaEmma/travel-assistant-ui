import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Attraction } from '../../types/travel';
import config from '../../config';

export const attractionApi = createApi({
    reducerPath: 'attractionApi',
    baseQuery: fetchBaseQuery({ baseUrl: config.API_URL }),
    endpoints: (builder) => ({
        createAttraction: builder.mutation<Attraction, Partial<Attraction>>({
            query: (newAttraction) => ({
                url: '/attraction',
                method: 'POST',
                body: newAttraction,
            })
        }),
    }),
});

export const { useCreateAttractionMutation } = attractionApi;