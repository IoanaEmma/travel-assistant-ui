import { View, Text, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { useChatWithAssistantMutation } from '../features/travel/travelApi';
import { RootState } from "../store";
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function Home() {
  const [chatWithAssistant, { isLoading }] = useChatWithAssistantMutation();
  const [userMessage, setUserMessage] = useState('');
  const router = useRouter();

  const handleChat = async () => {
    try {
      const response = await chatWithAssistant(userMessage).unwrap();
      console.log("Chat Response:", response.tab);

      router.push(`/${response.tab}`);
    } catch (error) {
      // handle error
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Smart Travel Assistant</Text>
      <Text style={styles.subtitle}>Your AI-powered travel companion</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={userMessage}
          onChangeText={setUserMessage}
          onSubmitEditing={handleChat}
          returnKeyType="send"
          style={styles.input}
          placeholder="Hi there, let me help you plan your next trip..."
          placeholderTextColor="#888"
        />
      </View>

      {isLoading && (
        <ActivityIndicator size="large" color="#1976d2" style={{ marginTop: 16 }} />
      )}
      {/* <View style={styles.boxGrid}>
        <View style={styles.row}>
          <View style={styles.box}>
            <Text style={styles.boxTitle}>Plan Trip</Text>
            <Text style={styles.boxDesc}>Create and organize your travel itinerary.</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.boxTitle}>Book Hotels</Text>
            <Text style={styles.boxDesc}>Find and reserve the best accommodations.</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.box}>
            <Text style={styles.boxTitle}>Explore Destinations</Text>
            <Text style={styles.boxDesc}>Discover attractions and local experiences.</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.boxTitle}>Travel Support</Text>
            <Text style={styles.boxDesc}>Get help and tips during your journey.</Text>
          </View>
        </View>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 24,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 32,
  },
  input: {
    width: '90%',
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 22,
    paddingHorizontal: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  boxGrid: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  box: {
    width: 140,
    height: 120,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    padding: 12,
  },
  boxTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1976d2',
    textAlign: 'center',
  },
  boxDesc: {
    fontSize: 13,
    color: '#333',
    textAlign: 'center',
  },
});