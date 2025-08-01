import { useLocalSearchParams } from 'expo-router';
import { View, ScrollView, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useLazyGetTripDetailsQuery, useUpdateTripMutation, useRemoveItemFromTripMutation } from '../features/trip/tripApi';

import React, { useState } from 'react';
import { getNumberOfDays } from '../utils/helpers';
import FlightComponent from '../components/Flight';
import HotelDetails from '../components/HotelDetails';

export default function TripDetailsScreen() {
    const { id } = useLocalSearchParams();
    const [getTripDetails, { data: tripDetails }] = useLazyGetTripDetailsQuery();
    const [updateTrip] = useUpdateTripMutation();
    const [removeItemFromTrip] = useRemoveItemFromTripMutation();

    const [editableWhen, setEditableWhen] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    React.useEffect(() => {
        if (id) getTripDetails({ userId: "1", tripId: id as string });
    }, [id]);

    React.useEffect(() => {
        if (tripDetails?.when) {
            setEditableWhen(tripDetails.when);
        }
    }, [tripDetails?.when]);

    const handleWhenUpdate = async () => {
        if (editableWhen !== tripDetails?.when && id) {
            try {
                await updateTrip({
                    userId: "1",
                    id: id as string,
                    when: editableWhen
                }).unwrap();

                // Refresh trip details after update
                getTripDetails({ userId: "1", tripId: id as string });
                setIsEditing(false);
            } catch (error) {
                console.error('Failed to update trip date:', error);
                // Reset to original value on error
                setEditableWhen(tripDetails?.when || '');
                setIsEditing(false);
            }
        } else {
            setIsEditing(false);
        }
    };

    const handleKeyPress = (event: any) => {
        if (event.nativeEvent.key === 'Enter') {
            handleWhenUpdate();
        }
    };

    const handleFlightRemoved = async () => {
        if (!tripDetails?.flight) return;
        try {
            await removeItemFromTrip({
                tripId: id as string,
                item: { type: 'flight', itemId: tripDetails.flight.id! }
            }).unwrap();
            getTripDetails({ userId: "1", tripId: id as string });
        }
        catch (error) {
            console.error('Failed to remove flight from trip:', error);
        }
    }

    const handleHotelRemoved = async () => {
        if (!tripDetails?.hotel) return;
        try {
            await removeItemFromTrip({
                tripId: id as string,
                item: { type: 'hotel', itemId: tripDetails.hotel.id! }
            }).unwrap();
            getTripDetails({ userId: "1", tripId: id as string });
        }
        catch (error) {
            console.error('Failed to remove hotel from trip:', error);
        }
    }

    const handleAttractionRemoved = async (attractionId: number) => {
        if (!tripDetails?.attractions) return;

        try {
            await removeItemFromTrip({
                tripId: id as string,
                item: { type: 'attraction', itemId: attractionId }
            }).unwrap();
            getTripDetails({ userId: "1", tripId: id as string });
        }
        catch (error) {
            console.error('Failed to remove attraction from trip:', error);
        }
    };

    if (!tripDetails) return <Text>Loading...</Text>;

    return (
        <View style={styles.container}>

            <View style={styles.modalContent}>
                <Text style={styles.title}>{tripDetails.name + ' - Trip Details'}</Text>
                {/* Editable When Field */}
                <TextInput
                    style={[styles.whenInput, isEditing && styles.whenInputEditing]}
                    value={editableWhen}
                    onChangeText={setEditableWhen}
                    onFocus={() => setIsEditing(true)}
                    onBlur={handleWhenUpdate}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter trip date"
                    multiline={false}
                    returnKeyType="done"
                />
                <View style={styles.columnsContainer}>
                    {/* Left Column - Hotel and Flight */}
                    <View style={styles.leftColumn}>
                        {/* Hotel */}
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Hotel</Text>

                        </View>
                        {tripDetails.hotel ? (
                            <HotelDetails hotel={tripDetails.hotel} rates={tripDetails.hotel.rates} currency={tripDetails.hotel.rates[0].currency}
                                showRemoveButton={true} onRemove={handleHotelRemoved} />
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
                                <FlightComponent flight={tripDetails.flight} readonly={true} showRemoveButton={true} onRemove={handleFlightRemoved} />
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
                                        {/* Remove button for attraction */}
                                        <TouchableOpacity
                                            style={styles.attractionRemoveButton}
                                            onPress={handleAttractionRemoved.bind(null, attr.id!)}
                                        >
                                            <Text style={styles.attractionRemoveButtonText}>✕</Text>
                                        </TouchableOpacity>
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
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
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
        position: 'relative',
    },
    attractionRemoveButton: {
        position: 'absolute',
        top: 4,
        right: 4,
        backgroundColor: '#7d6a6aff',
        borderRadius: 10,
        width: 14,
        height: 14,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    attractionRemoveButtonText: {
        color: '#fff',
        fontSize: 8,
        fontWeight: 'bold',
        lineHeight: 12,
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
    whenInput: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#5e90c2ff',
        textAlign: 'left',
        padding: 8,
        borderRadius: 8,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'transparent',
        minWidth: 200,
    },
    whenInputEditing: {
        backgroundColor: '#f0f4f8',
        borderColor: '#5e90c2ff',
        borderWidth: 2,
    }
});