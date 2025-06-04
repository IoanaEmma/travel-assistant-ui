import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Trip } from '../types/travel';

interface TripProps {
    trip: Trip;
}

const TripCard: React.FC<TripProps> = ({ trip }) => (
    <View style={styles.card}>
        <Text style={styles.name}>{trip.name}</Text>
    </View>
);

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        alignItems: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1976d2',
    },
});

export default TripCard;