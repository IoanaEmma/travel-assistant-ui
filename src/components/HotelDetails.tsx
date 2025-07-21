import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Hotel, Rate } from '../types/travel';
import { getNumberOfDays } from '../utils/helpers';

interface HotelDetailsProps {
    hotel: Hotel;
    rates: Rate[];
    currency?: string;
}

const HotelDetails: React.FC<HotelDetailsProps> = ({ hotel, rates, currency }) => {
    return (
        <View style={styles.hotelCard}>
            <View style={styles.hotelRow}>
                {/* Hotel Image */}
                {hotel.image ? (
                    <Image source={{ uri: hotel.image }} style={styles.hotelImage} />
                ) : (
                    <View style={[styles.hotelImage, styles.hotelImagePlaceholder]}>
                        <Text style={{ fontSize: 20, color: '#bbb' }}>🏢</Text>
                    </View>
                )}
                

                {/* Hotel Info */}
                <View style={styles.hotelInfo}>
                    {/* Name */}
                    <Text style={styles.hotelName}>{hotel.name}</Text>
                    {/* Type and City */}
                    <Text style={styles.hotelTypeCity}>
                        {hotel.accommodationType} • {hotel.city} • {getNumberOfDays(hotel.checkInDate, hotel.checkOutDate)} nights
                    </Text>
                    {/* Add a flex spacer to push rating row to the bottom */}
                    <View style={{ flex: 1 }} />
                    {/* Rating and Reviews at the bottom */}
                    <View style={styles.hotelRatingRow}>
                        <Text style={styles.hotelRating}>{hotel.rating} ⭐</Text>
                        <Text style={styles.hotelReviews}>({hotel.reviews} reviews)</Text>
                    </View>
                </View>

                {/* Rates */}
                <View style={styles.hotelRates}>
                    {rates && rates.length > 0 ? (
                        rates.map((rate, idx) => (
                            <View key={idx} style={styles.rateBoxVertical}>
                                <Text style={styles.rateProvider}>{rate.name} - {getNumberOfDays(hotel.checkInDate, hotel.checkOutDate) * (rate.ratePerNight)} {rate.currency}</Text>
                                <Text style={styles.rateDetail}>Rate/night: {rate.ratePerNight} {currency}</Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.value}>No rates available.</Text>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    hotelCard: {
        width: 700,
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 14,
        marginBottom: 12,
        marginHorizontal: 2,
        shadowColor: '#1976d2',
        shadowOpacity: 0.07,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    hotelRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    hotelImage: {
        width: 140,
        height: 140,
        borderRadius: 10,
        marginRight: 14,
        backgroundColor: '#eee',
    },
    hotelImagePlaceholder: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    hotelInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    hotelName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1976d2',
    },
    hotelTypeCity: {
        fontSize: 13,
        color: '#666',
        marginTop: 2,
        marginBottom: 6,
    },
    hotelRatingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 75,
    },
    hotelRating: {
        fontSize: 14,
        color: '#333',
        fontWeight: 'bold',
        marginRight: 6,
    },
    hotelReviews: {
        fontSize: 13,
        color: '#888',
    },
    hotelRates: {
        minWidth: 110,
        marginLeft: 14,
        alignItems: 'flex-start',
    },
    rateBoxVertical: {
        backgroundColor: '#f0f4f8',
        borderRadius: 8,
        padding: 6,
        marginBottom: 6,
        minWidth: 200,
    },
    rateProvider: {
        fontWeight: 'bold',
        color: '#1976d2',
        fontSize: 13,
    },
    rateDetail: {
        fontSize: 12,
        color: '#444',
    },
    value: {
        fontWeight: 'normal',
        color: '#222',
    },
});

export default HotelDetails;