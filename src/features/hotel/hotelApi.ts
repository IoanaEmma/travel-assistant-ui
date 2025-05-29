import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HotelDetails } from '../../types/travel';
import config from '../../config';
import { setHotelDetails } from './hotelSlice';

export const hotelApi = createApi({
    reducerPath: 'hotelApi',
    baseQuery: fetchBaseQuery({ baseUrl: config.API_URL }),
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
    }),
});

export const { useGetHotelDetailsQuery } = hotelApi;