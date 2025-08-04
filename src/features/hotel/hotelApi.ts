import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HotelDetails, Hotel } from '../../types/travel';
import config from '../../config';
import { setCurrentHotel, setHotelDetails } from './hotelSlice';

export const hotelApi = createApi({
    reducerPath: 'hotelApi',
    baseQuery: fetchBaseQuery({ baseUrl: config.API_URL }),
    tagTypes: ['Hotels', 'Cities'],
    endpoints: (builder) => ({
        getHotelDetails: builder.query<HotelDetails, { key: string; checkInDate: string; checkOutDate: string }>({
            query: ({ key, checkInDate, checkOutDate }) => ({
                url: `/hotel`,
                method: 'GET',
                params: {
                    key,
                    checkInDate,
                    checkOutDate,
                },
            }),
            async onQueryStarted({ key, checkInDate, checkOutDate }, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data) {
                        setHotelDetails(data);
                    }
                } catch (error) {
                    console.error('Failed to fetch hotel details:', error);
                }
            }
        }),
        createHotel: builder.mutation<Hotel, Partial<Hotel>>({
            query: (newHotel) => ({
                url: `/hotel`,
                method: 'POST',
                body: newHotel,
            }),
            invalidatesTags: ["Hotels", "Cities"],
            async onQueryStarted(newHotel, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data) {
                        setCurrentHotel(data);
                    }
                } catch (error) {
                    console.error('Failed to create hotel:', error);
                }
            }
        }),
        getHotelsByCity: builder.query<Hotel[], string | undefined>({
            query: (city) => ({
                url: city ? `/hotel/all?city=${city}` : '/hotel/all',
                method: 'GET',
            }),
            providesTags: ["Hotels"]
        }),
        getHotelsCities: builder.query<string[], void>({
            query: () => ({
                url: '/hotel/cities',
                method: 'GET',
            }),
            providesTags: ["Cities"],
        }),
        deleteHotel: builder.mutation<void, number>({
            query: (id) => ({
                url: `/hotel/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Hotels", "Cities"]
        })
    })
});

export const {
    useGetHotelDetailsQuery,
    useCreateHotelMutation,
    useGetHotelsByCityQuery,
    useLazyGetHotelsByCityQuery,
    useGetHotelsCitiesQuery,
    useDeleteHotelMutation
} = hotelApi;