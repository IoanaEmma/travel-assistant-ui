import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Attraction } from '../types/travel';
import { useGetTripsQuery, useCreateTripMutation, useAddItemToTripMutation } from '../features/trip/tripApi';
import { useCreateAttractionMutation, useDeleteAttractionMutation } from '../features/attractions/attractionApi';
import AddToTripModal from './modals/AddToTripModal';

interface AttractionProps {
    attraction: Attraction;
    readonly?: boolean;
    isSaved?: boolean;
}

const AttractionCard: React.FC<AttractionProps> = ({ attraction, readonly, isSaved }) => {
    const [addToTripModalVisible, setAddToTripModalVisible] = useState(false);
    const [createTrip] = useCreateTripMutation();
    const [createAttraction] = useCreateAttractionMutation();
    const [addItemToTrip] = useAddItemToTripMutation();
    const [deleteAttraction] = useDeleteAttractionMutation();

    // Get active trips for dropdown
    const { data: trips = [] } = useGetTripsQuery("1");
    const activeTrips = trips.filter(trip => trip.status === 'active' || !trip.status);

    const handleAddToTrip = () => {
        setAddToTripModalVisible(true);
    };

    const handleSelectTrip = async (tripId: string) => {
        if (attraction.id) {
            await addItemToTrip({ tripId, item: { type: 'attraction', itemId: attraction.id } });
        }
        else {
            const currentAttraction = await createAttraction(attraction).unwrap();
            if (currentAttraction) {
                await addItemToTrip({ tripId, item: { type: 'attraction', itemId: currentAttraction.id! } });
            }
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

    const handleAddToFavorites = async () => {
        await createAttraction(attraction).unwrap();
    }

    const handleDeleteAttraction = async () => {
        if (confirm(`Are you sure you want to delete "${attraction.name}"?`)) {
            try {
                await deleteAttraction(attraction.id!);
            } catch (error) {
                console.error('Failed to delete attraction:', error);
            }
        }
    }

    const handleWebsitePress = async () => {
        try {
            const supported = await Linking.canOpenURL(attraction.website);
            if (supported) {
                await Linking.openURL(attraction.website);
            } else {
                console.log("Don't know how to open URI: " + attraction.website);
            }
        } catch (error) {
            console.error('Error opening website:', error);
        }
    };

    const isValidWebsite = (website: string) => {
        return website &&
            website !== "No website provided" &&
            (website.startsWith('http://') || website.startsWith('https://') || website.startsWith('www.'));
    };

    const renderWebsite = () => {
        if (isValidWebsite(attraction.website)) {
            return (
                <View style={styles.websiteContainer}>
                    <Text style={styles.website}>Website: </Text>
                    <TouchableOpacity onPress={handleWebsitePress}>
                        <Text style={styles.websiteLink}>{attraction.website}</Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <Text style={styles.website}>Website: {attraction.website}</Text>
            );
        }
    };

    return (
        <>
            <View style={styles.card}>
                {/* Action buttons - positioned absolutely in top-right corner */}
                {!readonly && (
                    <View style={styles.actionButtonsContainer}>
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={handleAddToTrip}
                        >
                            <Text style={styles.actionButtonText}>➕</Text>
                        </TouchableOpacity>

                        {/* Only show heart button if not already saved */}
                        {!isSaved && (
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={handleAddToFavorites}
                            >
                                <Text style={styles.actionButtonText}>❤️</Text>
                            </TouchableOpacity>
                        )}

                        {isSaved && (
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={handleDeleteAttraction}
                            >
                                <Text style={[styles.actionButtonText, { color: '#d63b3bff' }]}>✖</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{attraction.name}</Text>
                    <Text style={styles.location}>Address: {attraction.address}</Text>
                    {renderWebsite()}
                    <Text style={styles.rating}>Opening hours: {attraction.openingHours}</Text>
                </View>
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
        position: 'relative',
    },
    actionButtonsContainer: {
        position: 'absolute',
        top: 8,
        right: 8,
        flexDirection: 'row',
        zIndex: 1,
    },
    actionButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 4
    },
    actionButtonText: {
        fontSize: 18,
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
    website: {
        fontSize: 14,
        color: '#444',
        marginBottom: 2,
    },
    websiteLink: {
        fontSize: 14,
        color: '#1976d2',
        marginBottom: 2,
        textDecorationLine: 'underline',
    },
    rating: {
        fontSize: 14,
        color: '#444',
        marginBottom: 2,
    },
    websiteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
});

export default AttractionCard;