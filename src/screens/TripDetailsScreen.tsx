import { useLocalSearchParams } from 'expo-router';
import { View, ScrollView, Text, Image, StyleSheet } from 'react-native';
import { useLazyGetTripDetailsQuery } from '../features/trip/tripApi';

import React from 'react';
import { getNumberOfDays } from '../utils/helpers';
import FlightComponent from '../components/Flight';
import HotelDetails from '../components/HotelDetails';

export default function TripDetailsScreen() {
    const { id } = useLocalSearchParams();
    const [getTripDetails, { data: tripDetails }] = useLazyGetTripDetailsQuery();

    React.useEffect(() => {
        if (id) getTripDetails({ userId: "1", tripId: id as string });
    }, [id]);

    if (!tripDetails) return <Text>Loading...</Text>;

    return (
        <ScrollView>
            <View style={styles.modalContent}>
                <ScrollView>
                    <Text style={styles.title}>{tripDetails.name}</Text>
                    {/* Hotel */}

                    <Text style={styles.sectionTitle}>Hotel</Text>
                    <HotelDetails hotel={tripDetails.hotel} rates={tripDetails.hotel.rates} currency={tripDetails.hotel.rates[0].currency} />
                    
                    {/* Flight */}
                    <Text style={styles.sectionTitle}>Flight</Text>

                    {tripDetails.flight ? (
                        <View style={styles.flightWrapper}>
                            <FlightComponent flight={tripDetails.flight} />
                        </View>

                    ) : (
                        <View style={styles.placeholderContainer}>
                            <Text style={styles.placeholderIcon}>✈️</Text>
                            <Text style={styles.empty}>This trip has no flight yet</Text>
                        </View>
                    )}


                    <Text style={styles.sectionTitle}>Attractions</Text>
                    <View style={styles.section}>
                        {tripDetails.attractions.length === 0 ? (
                            <Text style={styles.value}>No attractions added.</Text>
                        ) : (
                            tripDetails.attractions.map((attr, idx) => (
                                <View key={idx} style={styles.attractionBox}>
                                    <Text style={styles.attractionName}>{attr.name}</Text>
                                    <Text style={styles.attractionDetail}>Address: {attr.address}</Text>
                                    <Text style={styles.attractionDetail}>Website: {attr.website}</Text>
                                    <Text style={styles.attractionDetail}>Opening Hours: {attr.openingHours}</Text>
                                </View>
                            ))
                        )}
                    </View>
                </ScrollView>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    flightWrapper: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#f7faff',
        padding: 30,
        elevation: 6,
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#1976d2',
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 6,
        color: '#333',
    },
    section: {
        marginBottom: 10,
        paddingLeft: 4,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#444',
    },
    value: {
        fontWeight: 'normal',
        color: '#222',
    },
    ratesRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 8, // Optional: for spacing between rate boxes (React Native 0.71+)
    },
    rateBox: {
        backgroundColor: '#f0f4f8',
        borderRadius: 8,
        padding: 6,
        marginVertical: 3,
        marginRight: 8, // Add spacing between boxes for older React Native
        minWidth: 150,
    },
    attractionBox: {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 8,
        marginVertical: 4,
    },
    attractionName: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#1976d2',
    },
    attractionDetail: {
        fontSize: 13,
        color: '#444',
    },
    closeButton: {
        width: 50,
        marginTop: 16,
        backgroundColor: '#1976d2',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    placeholderContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 12,
    },
    placeholderIcon: {
        fontSize: 40,
        marginBottom: 6,
    },
    empty: {
        fontSize: 16,
        color: '#888',
    },
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
    ratesLabel: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#444',
        marginBottom: 4,
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
});