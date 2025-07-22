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
        <View style={styles.container}>

            <View style={styles.modalContent}>
                <Text style={styles.title}>{tripDetails.name  + ' - Trip Details'}</Text>

                <View style={styles.columnsContainer}>
                    {/* Left Column - Hotel and Flight */}
                    <View style={styles.leftColumn}>
                        {/* Hotel */}
                        <Text style={styles.sectionTitle}>Hotel</Text>
                        {tripDetails.hotel ? (
                            <HotelDetails hotel={tripDetails.hotel} rates={tripDetails.hotel.rates} currency={tripDetails.hotel.rates[0].currency} />
                        ) : (
                            <View style={styles.placeholderContainer}>
                                <Text style={styles.placeholderIcon}>🏢</Text>
                                <Text style={styles.empty}>This trip has no hotel yet</Text>
                            </View>
                        )}

                        {/* Flight */}
                        <Text style={styles.sectionTitle}>Flight</Text>
                        {tripDetails.flight ? (
                            <View >
                                <FlightComponent flight={tripDetails.flight} readonly={true} />
                            </View>
                        ) : (
                            <View style={styles.placeholderContainer}>
                                <Text style={styles.placeholderIcon}>✈️</Text>
                                <Text style={styles.empty}>This trip has no flight yet</Text>
                            </View>
                        )}
                    </View>

                    {/* Right Column - Attractions */}
                    <View style={styles.rightColumn}>
                        <Text style={styles.sectionTitle}>Attractions</Text>
                        <View style={styles.section}>
                            {tripDetails.attractions.length === 0 ? (
                                <View style={styles.placeholderContainer}>
                                    <Text style={styles.placeholderIcon}>🎡</Text>
                                    <Text style={styles.empty}>No attractions added yet</Text>
                                </View>
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
                    </View>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7faff',
        width: '100%',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%',
        paddingVertical: 20,
        width: '100%',
    },
    modalContent: {
        padding: 30,
        elevation: 6,
        alignItems: 'flex-start'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#1976d2',
        textAlign: 'center',
    },
    columnsContainer: {
        flexDirection: 'row',
        width: '100%',
        gap: 20,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    leftColumn: {
        flex: 1,
        maxWidth: '40%',
        minWidth: 0, // Prevents flex issues
    },
    rightColumn: {
        maxWidth: '48%',
        flex: 1,
        minWidth: 0, // Prevents flex issues
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 6,
        color: '#333',
    },
    placeholderIcon: {
        fontSize: 40,
        marginBottom: 6,
    },
    empty: {
        fontSize: 16,
        color: '#888',
    },
    placeholderContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        padding: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: '#ddd',
    },

    section: {
        marginBottom: 10,
        paddingLeft: 4,
    },
    attractionBox: {
        backgroundColor: '#fff',
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
});