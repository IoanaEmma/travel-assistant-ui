import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Flight } from '../types/travel';
import { formatDateTime } from '../utils/helpers';
import { useGetTripsQuery, useCreateTripMutation, useAddItemToTripMutation } from '../features/trip/tripApi';
import { useCreateFlightMutation } from '../features/flight/flightApi';
import AddToTripModal from './modals/AddToTripModal';

interface FlightProps {
  flight: Flight;
  readonly?: boolean; // Optional prop to make the component read-only
}

const FlightComponent: React.FC<FlightProps> = ({ flight, readonly }) => {
  const [addToTripModalVisible, setAddToTripModalVisible] = useState(false);
  const [createTrip, { isLoading: isCreating }] = useCreateTripMutation();
  const [createFlight, { isLoading: isCreatingFlight }] = useCreateFlightMutation();
  const [addItemToTrip] = useAddItemToTripMutation();

  // Get active trips for dropdown
  const { data: trips = [] } = useGetTripsQuery("1");
  const activeTrips = trips.filter(trip => trip.status === 'active' || !trip.status);

  const handleAddToTrip = () => {
    setAddToTripModalVisible(true);
  };

  const handleSelectTrip = async (tripId: string) => {
    console.log('Adding flight to trip:', tripId);
    const currentFlight = await createFlight(flight).unwrap();
    if (currentFlight) {
      console.log('Flight created:', currentFlight);
      await addItemToTrip({ tripId, item: { type: 'flight', itemId: currentFlight.id! } });
    }

    setAddToTripModalVisible(false);
  };

  const handleCreateNewTrip = async () => {
    console.log('Creating new trip for flight');
    await createTrip({ userId: "1", name: flight.destination, when: flight.departureFlight.segments[0].departureTime });
  };

  // Helper to get summary for a flight direction (departure/return)
  const renderFlightSummary = (segments: any[], title: string) => {
    if (!segments || segments.length === 0) return null;
    const first = segments[0];
    const last = segments[segments.length - 1];
    const stops = segments.length - 1;
    const stopNames = segments[segments.length - 1].departureAirport

    return (
      <View style={styles.directionContainer}>
        <Text style={styles.directionTitle}>{title} on {formatDateTime(last.arrivalTime).date}</Text>
        <View style={styles.segment}>
          <Text style={styles.segmentText}>
            {first.departureAirport} ({formatDateTime(first.departureTime).time}) → {last.arrivalAirport} ({formatDateTime(last.arrivalTime).time})
          </Text>
          <Text style={styles.segmentText}>
            Carrier: {first.airline} {first.flightNumber} - {last.airline} {last.flightNumber}
          </Text>
          <Text style={styles.segmentText}>
            Stops: {stops} {stops > 0 ? `(${stopNames})` : ''}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.price}>Total Price: {flight.totalPrice}</Text>

          {/* Add to Trip Button - only show if not readonly */}
          {!readonly && (
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddToTrip}
            >
              <Text style={styles.addButtonText}>+ Add to Trip</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.directionsRow}>
          {renderFlightSummary(flight.departureFlight.segments, 'Departure')}
          {renderFlightSummary(flight.returnFlight?.segments || [], 'Return')}
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
    width: 700,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginVertical: 12,
    marginHorizontal: 8,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    // Elevation for Android
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#1976d2',
    flex: 1,
  },
  addButton: {
    backgroundColor: '#1976d2',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  directionContainer: {
    marginBottom: 10,
    width: '50%'
  },
  directionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  directionTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
    fontSize: 14,
    color: '#333',
  },
  segment: {
    marginBottom: 4,
    paddingLeft: 8,
  },
  segmentText: {
    fontSize: 14,
    color: '#444',
  },
});

export default FlightComponent;