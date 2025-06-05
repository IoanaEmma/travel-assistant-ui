import React from 'react';
import { Modal, View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { TripDetails } from '../types/travel';
import { getNumberOfDays } from '../utils/helpers';

interface TripDetailsModalProps {
    visible: boolean;
    onClose: () => void;
    trip: TripDetails | null;
}

const TripDetailsModal: React.FC<TripDetailsModalProps> = ({ visible, onClose, trip }) => {
    if (!trip) return null;

    return (
        <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={styles.modalContent}>
                    <ScrollView>
                        <Text style={styles.title}>{trip.name}</Text>
                        {/* Hotel */}
                        <Text style={styles.sectionTitle}>Hotel</Text>
                        <View style={styles.hotelCard}>
                            {trip.hotel ? (
                                <View style={styles.hotelRow}>
                                    {/* Hotel Image */}
                                    {trip.hotel.image ? (
                                        <Image source={{ uri: trip.hotel.image }} style={styles.hotelImage} />
                                    ) : (
                                        <View style={[styles.hotelImage, styles.hotelImagePlaceholder]}>
                                            <Text style={{ fontSize: 32, color: '#bbb' }}>🏢</Text>
                                        </View>
                                    )}

                                    {/* Hotel Info */}
                                    <View style={styles.hotelInfo}>
                                        {/* Name */}
                                        <Text style={styles.hotelName}>{trip.hotel.name}</Text>
                                        {/* Type and City */}
                                        <Text style={styles.hotelTypeCity}>
                                            {trip.hotel.accommodationType} • {trip.hotel.city} • {getNumberOfDays(trip.hotel.checkInDate, trip.hotel.checkOutDate)} nights
                                        </Text>
                                        {/* Add a flex spacer to push rating row to the bottom */}
                                        <View style={{ flex: 1 }} />
                                        {/* Rating and Reviews at the bottom */}
                                        <View style={styles.hotelRatingRow}>
                                            <Text style={styles.hotelRating}>{trip.hotel.rating} ⭐</Text>
                                            <Text style={styles.hotelReviews}>({trip.hotel.reviews} reviews)</Text>
                                        </View>
                                    </View>

                                    {/* Rates */}
                                    <View style={styles.hotelRates}>

                                        {trip.hotel.rates && trip.hotel.rates.length > 0 ? (
                                            trip.hotel.rates.map((rate, idx) => (
                                                <View key={idx} style={styles.rateBoxVertical}>
                                                    <Text style={styles.rateProvider}>{rate.name} - {getNumberOfDays(trip.hotel.checkInDate, trip.hotel.checkOutDate) * (rate.ratePerNight)} {rate.currency}</Text>
                                                    <Text style={styles.rateDetail}>Rate/night: {rate.ratePerNight}</Text>
                                                </View>
                                            ))
                                        ) : (
                                            <Text style={styles.value}>No rates available.</Text>
                                        )}
                                    </View>
                                </View>
                            ) : (
                                <View style={styles.placeholderContainer}>
                                    <Text style={styles.placeholderIcon}>🏢</Text>
                                    <Text style={styles.empty}>This trip has no hotel yet</Text>
                                </View>
                            )}
                        </View>

                        {/* Flight */}
                        <Text style={styles.sectionTitle}>Flight</Text>
                        {
                            trip.flight && (
                                <View style={styles.section}>
                                    <Text style={styles.label}>From: <Text style={styles.value}>{trip.flight.origin}</Text></Text>
                                    <Text style={styles.label}>To: <Text style={styles.value}>{trip.flight.destination}</Text></Text>
                                    <Text style={styles.label}>Total Price: <Text style={styles.value}>{trip.flight.totalPrice}</Text></Text>

                                    {/* You can add more flight details here */}
                                </View>
                            )
                        }

                        <Text style={styles.sectionTitle}>Attractions</Text>
                        <View style={styles.section}>
                            {trip.attractions.length === 0 ? (
                                <Text style={styles.value}>No attractions added.</Text>
                            ) : (
                                trip.attractions.map((attr, idx) => (
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
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.35)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '50%',
        maxHeight: '80%',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 18,
        elevation: 6,
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
        backgroundColor: '#f7faff',
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
        width: 150,
        height: 150,
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
        fontSize: 18,
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

export default TripDetailsModal;