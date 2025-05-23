import { View, Text, StyleSheet } from 'react-native';

export default function Flights() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flights</Text>
      <Text>Search flights here.</Text>
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
