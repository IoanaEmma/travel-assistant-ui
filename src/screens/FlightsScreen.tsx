import { View, Text, StyleSheet, FlatList } from 'react-native';
import FlightComponent from '../components/Flight';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export default function Flights() {
  const flights = useSelector((state: RootState) => state.travel.foundFlights);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flights that matched your request</Text>
      <FlatList
              data={flights}
              keyExtractor={(item) => item.totalPrice}
              renderItem={({ item }) => (
                <FlightComponent flight={item} ></FlightComponent>
              )}
              ListEmptyComponent={<Text>No flights found.</Text>}
            />
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
});
