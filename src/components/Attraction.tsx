import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Attraction } from '../types/travel';

interface AttractionProps {
    attraction: Attraction;
}

const AttractionCard: React.FC<AttractionProps> = ({ attraction }) => (
    <View style={styles.card}>
        <View style={styles.infoContainer}>
            <Text style={styles.name}>{attraction.name}</Text>
            <Text style={styles.location}>Address: {attraction.address}</Text>
            <Text style={styles.type}>Website: {attraction.website}</Text>
            <Text style={styles.rating}>Opening hours: {attraction.openingHours} </Text>
        </View>
    </View>
);

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
    image: {
        width: 90,
        height: 90,
        borderRadius: 12,
        marginRight: 16,
        backgroundColor: '#eee',
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
    description: {
        fontSize: 13,
        color: '#333',
        marginTop: 4,
    },
});

export default AttractionCard;