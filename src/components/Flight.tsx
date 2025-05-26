import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Flight } from '../types/travel';

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

    return (
      <View style={styles.directionContainer}>
        <Text style={styles.directionTitle}>{title}</Text>
        <View style={styles.segment}>
          <Text style={styles.segmentText}>
            {first.departureAirport} ({first.departureTime}) → {last.arrivalAirport} ({last.arrivalTime})
          </Text>
          <Text style={styles.segmentText}>
            Carrier: {first.airline} {first.flightNumber} - {last.airline} {last.flightNumber}
          </Text>
          <Text style={styles.segmentText}>
            Stops: {stops}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.card}>
      <Text style={styles.price}>Total Price: {flight.totalPrice}</Text>
      {renderFlightSummary(flight.departureFlight.segments, 'Departure')}
      {renderFlightSummary(flight.returnFlight?.segments || [], 'Return')}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
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
    fontSize: 18,
    marginBottom: 10,
    color: '#1976d2',
  },
  directionContainer: {
    marginBottom: 10,
  },
  directionTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
    fontSize: 15,
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