import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Modal, ActivityIndicator } from 'react-native';
import { Hotel, Rate } from '../types/travel';
import { useGetHotelDetailsQuery } from '../features/hotel/hotelApi';

interface HotelProps {
  hotel: Hotel;
}

const HotelCard: React.FC<HotelProps> = ({ hotel }) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Only fetch details when modal is visible
  const { data: hotelDetails, isLoading } = useGetHotelDetailsQuery(
    {
      key: hotel.key,
      checkInDate: hotel.checkInDate,
      checkOutDate: hotel.checkOutDate
    }, {
    skip: !modalVisible,
  });

  return (
    <>
      <Pressable onPress={() => setModalVisible(true)}>
        <View style={styles.card}>
          <Image
            source={{ uri: hotel.image }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{hotel.name}</Text>
            <Text style={styles.review}>Reviews: {hotel.reviews}</Text>
            <Text style={styles.rating}>Rating: {hotel.rating} ⭐</Text>
            <Text style={styles.price}>Price range: {hotel.price.min} - {hotel.price.max}</Text>
          </View>
        </View>
      </Pressable>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#1976d2" />
            ) : hotelDetails ? (
              <>
                <Text style={styles.modalTitle}>{hotel.name}</Text>
                <Image source={{ uri: hotel.image }} style={styles.modalImage} />
                <Text>Reviews: {hotel.reviews}</Text>
                <Text>Rating: {hotel.rating} ⭐</Text>
                <Text>Price range: {hotel.price.min} - {hotel.price.max}</Text>
                <Text style={{ fontWeight: 'bold', marginTop: 12 }}>Rates:</Text>
                {hotelDetails.rates && hotelDetails.rates.length > 0 ? (
                  hotelDetails.rates.map((rate: Rate, idx: number) => (
                    <View key={idx} style={{ marginVertical: 4 }}>
                      <Text>Provider: {rate.name}</Text>
                      <Text>Price per night: {rate.ratePerNight} {hotelDetails.currency}</Text>
                      <Text>Tax: {rate.tax} {hotelDetails.currency}</Text>
                    </View>
                  ))
                ) : (
                  <Text>No rates available.</Text>
                )}
              </>
            ) : (
              <Text>Failed to load hotel details.</Text>
            )}
            <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={{ color: '#fff' }}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

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
  review: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  rating: {
    fontSize: 14,
    color: '#444',
    marginBottom: 2,
  },
  price: {
    fontSize: 16,
    color: '#388e3c',
    fontWeight: 'bold',
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 320,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    color: '#1976d2',
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#eee',
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: '#1976d2',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
});

export default HotelCard;