import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Attraction } from '../types/travel';
import { useGetTripsQuery, useCreateTripMutation, useAddItemToTripMutation } from '../features/trip/tripApi';
import { useCreateAttractionMutation } from '../features/attractions/attractionApi';
import AddToTripModal from './modals/AddToTripModal';

interface AttractionProps {
    attraction: Attraction;
    readonly?: boolean;
}

const AttractionCard: React.FC<AttractionProps> = ({ attraction, readonly }) => {
    const [addToTripModalVisible, setAddToTripModalVisible] = useState(false);
    const [createTrip] = useCreateTripMutation();
    const [createAttraction] = useCreateAttractionMutation();
    const [addItemToTrip] = useAddItemToTripMutation();

    // Get active trips for dropdown
    const { data: trips = [] } = useGetTripsQuery("1");
    const activeTrips = trips.filter(trip => trip.status === 'active' || !trip.status);

    const handleAddToTrip = () => {
        setAddToTripModalVisible(true);
    };

    const handleSelectTrip = async (tripId: string) => {
        console.log('Adding attraction to trip:', tripId);
        const currentAttraction = await createAttraction(attraction).unwrap();
        if (currentAttraction) {
            console.log('Attraction created:', currentAttraction);
            await addItemToTrip({ tripId, item: { type: 'attraction', itemId: currentAttraction.id! } });
        }
        setAddToTripModalVisible(false);
    };

    const handleCreateNewTrip = async () => {
        console.log('Creating new trip for attraction');
        await createTrip({
            userId: "1",
            name: `Trip to ${attraction.name}`,
            when: new Date().toISOString()
        });
        setAddToTripModalVisible(false);
    };

    return (
        <>
            <View style={styles.card}>
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{attraction.name}</Text>
                    <Text style={styles.location}>Address: {attraction.address}</Text>
                    <Text style={styles.type}>Website: {attraction.website}</Text>
                    <Text style={styles.rating}>Opening hours: {attraction.openingHours}</Text>
                </View>

                {/* Add to Trip Button */}
                {!readonly && (
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={handleAddToTrip}
                    >
                        <Text style={styles.addButtonText}>+ Add to Trip</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Add to Trip Modal */}
            <AddToTripModal
                visible={addToTripModalVisible}
                onClose={() => setAddToTripModalVisible(false)}
                activeTrips={activeTrips}
                onSelectTrip={handleSelectTrip}
                onCreateNewTrip={handleCreateNewTrip}
            />
        </>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginVertical: 10,
        marginHorizontal: 8,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 4,
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 4,
        color: '#1976d2',
    },
    location: {
        fontSize: 14,
        color: '#555',
        marginBottom: 2,
    },
    type: {
        fontSize: 14,
        color: '#444',
        marginBottom: 2,
    },
    rating: {
        fontSize: 14,
        color: '#444',
        marginBottom: 2,
    },
    addButton: {
        backgroundColor: '#1976d2',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginLeft: 16,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default AttractionCard;