import { View, Text, StyleSheet, ScrollView } from 'react-native';
import FlightComponent from '../components/Flight';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export default function Flights() {
  const flights = useSelector((state: RootState) => state.travel.foundFlights);

  // Show placeholder when no flights are found
  if (flights.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateIcon}>✈️</Text>
          <Text style={styles.emptyStateTitle}>No flights searched</Text>
          <Text style={styles.emptyStateSubtitle}>
            Search for flights from the home screen to see results here
          </Text>
        </View>
      </View>
    );
  }

  const pageHeader = `Flights that matched your search in ${flights[0].destination}`;
  const leftFlights = flights.slice(0, 5);
  const rightFlights = flights.slice(5, 10);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{pageHeader}</Text>
      <ScrollView contentContainerStyle={styles.columnsContainer}>
        <View style={styles.column}>
          {leftFlights.map(flight => (
            <FlightComponent key={flight.id} flight={flight} readonly={false} />
          ))}
        </View>
        <View style={styles.column}>
          {rightFlights.map(flight => (
            <FlightComponent key={flight.id} flight={flight} readonly={false} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  columnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  column: {
    flex: 1,
    marginHorizontal: 4,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyStateIcon: {
    fontSize: 60,
    marginBottom: 20,
    opacity: 0.6,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    lineHeight: 24,
  },
});