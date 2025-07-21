import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Flight } from '../types/travel';
import { formatDateTime } from '../utils/helpers';

interface FlightProps {
  flight: Flight;
}

const FlightComponent: React.FC<FlightProps> = ({ flight }) => {
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
    <View style={styles.card}>
      <Text style={styles.price}>Total Price: {flight.totalPrice}</Text>
      <View style={styles.directionsRow}>
        {renderFlightSummary(flight.departureFlight.segments, 'Departure')}
        {renderFlightSummary(flight.returnFlight?.segments || [], 'Return')}
      </View>
    </View>
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
  price: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    color: '#1976d2',
  },
  directionContainer: {
    marginBottom: 10,
  },
  directionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16, // for RN 0.71+, otherwise use marginRight on directionContainer
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