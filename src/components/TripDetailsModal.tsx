import React from 'react';
import { Modal, View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { TripDetails } from '../types/travel';

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
                        <View style={styles.section}>
                            <Text style={styles.label}>Name: <Text style={styles.value}>{trip.hotel.name}</Text></Text>
                            <Text style={styles.label}>Type: <Text style={styles.value}>{trip.hotel.accommodationType}</Text></Text>
                            <Text style={styles.label}>Rating: <Text style={styles.value}>{trip.hotel.rating} ⭐</Text></Text>
                            <Text style={styles.label}>Reviews: <Text style={styles.value}>{trip.hotel.reviews}</Text></Text>
                            <Text style={styles.label}>City: <Text style={styles.value}>{trip.hotel.city}</Text></Text>
                            <Text style={styles.label}>Check-in: <Text style={styles.value}>{trip.hotel.checkInDate}</Text></Text>
                            <Text style={styles.label}>Check-out: <Text style={styles.value}>{trip.hotel.checkOutDate}</Text></Text>
                            
                            <Text style={styles.label}>Rates:</Text>
                            {trip.hotel.rates && trip.hotel.rates.length > 0 ? (
                                trip.hotel.rates.map((rate, idx) => (
                                    <View key={idx} style={styles.rateBox}>
                                        <Text>Provider: {rate.name}</Text>
                                        <Text>Rate per night: {rate.ratePerNight}</Text>
                                        <Text>Tax: {rate.tax}</Text>
                                    </View>
                                ))
                            ) : (
                                <Text style={styles.value}>No rates available.</Text>
                            )}
                        </View>
                        {/* Flight */}
                        <Text style={styles.sectionTitle}>Flight</Text>
                        <View style={styles.section}>
                            <Text style={styles.label}>From: <Text style={styles.value}>{trip.flight.origin}</Text></Text>
                            <Text style={styles.label}>To: <Text style={styles.value}>{trip.flight.destination}</Text></Text>
                            <Text style={styles.label}>Total Price: <Text style={styles.value}>{trip.flight.totalPrice}</Text></Text>
                            
                            {/* You can add more flight details here */}
                        </View>
                        {/* Attractions */}
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
        width: '80%',
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
    hotelImage: {
        width: '100%',
        height: 120,
        borderRadius: 10,
        marginVertical: 8,
        backgroundColor: '#eee',
    },
    rateBox: {
        backgroundColor: '#f0f4f8',
        borderRadius: 8,
        padding: 6,
        marginVertical: 3,
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
});

export default TripDetailsModal;