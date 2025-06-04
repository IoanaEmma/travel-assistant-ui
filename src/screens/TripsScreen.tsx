import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import TripCard from '../components/Trip';
import { Trip } from '../types/travel';
import { useGetTripsQuery } from '../features/trip/tripApi';

export default function Trips() {
  const { data: trips = [], isLoading } = useGetTripsQuery("1");
  const handleCreateTrip = () => {
    // Navigate to trip creation screen/modal
  };

  const renderTrip = ({ item }: { item: Trip }) => (
    <TripCard trip={item} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trips</Text>
      <TouchableOpacity style={styles.createButton} onPress={handleCreateTrip}>
        <Text style={styles.createButtonText}>+ Create New Trip</Text>
      </TouchableOpacity>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1976d2" />
        </View>
      ) : trips.length === 0 ? (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderIcon}>🧳</Text>
          <Text style={styles.empty}>No trips yet</Text>
        </View>
      ) : (
        <FlatList
          data={trips}
          keyExtractor={item => item.id}
          renderItem={renderTrip}
          contentContainerStyle={{ paddingVertical: 8 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  createButton: {
    backgroundColor: '#1976d2',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  createButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  tripName: { fontWeight: 'bold', fontSize: 18, marginBottom: 4 },
  detail: { fontSize: 14, color: '#444', marginBottom: 2 },
  placeholderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 48,
  },
  placeholderIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  empty: { fontSize: 16, color: '#888' },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 48,
  },
});