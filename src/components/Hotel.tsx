import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Modal, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Hotel, Rate } from '../types/travel';
import { useGetHotelDetailsQuery } from '../features/hotel/hotelApi';
import HotelDetails from './HotelDetails';
import { useCreateTripMutation, useGetTripsQuery, useAddItemToTripMutation } from '../features/trip/tripApi';
import AddToTripModal from './modals/AddToTripModal';
import { useCreateHotelMutation, useDeleteHotelMutation } from '../features/hotel/hotelApi';

interface HotelProps {
	hotel: Hotel;
	isSaved?: boolean;
}

const HotelCard: React.FC<HotelProps> = ({ hotel, isSaved }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [addToTripModalVisible, setAddToTripModalVisible] = useState(false);
	const [createTrip, { isLoading: isCreating }] = useCreateTripMutation();
	const [createHotel] = useCreateHotelMutation();
	const [deleteHotel] = useDeleteHotelMutation();
	const [addItemToTrip] = useAddItemToTripMutation();

	// Get active trips for dropdown
	const { data: trips = [] } = useGetTripsQuery("1");
	const activeTrips = trips.filter(trip => trip.status === 'active' || !trip.status);

	// Only fetch details when modal is visible
	const { data: hotelDetails, isLoading } = useGetHotelDetailsQuery(
		{
			key: hotel.key,
			checkInDate: hotel.checkInDate,
			checkOutDate: hotel.checkOutDate
		}, {
		skip: !modalVisible,
	});

	const handleAddToTrip = (e: any) => {
		e.stopPropagation(); // Prevent opening the hotel details modal
		setAddToTripModalVisible(true);
	};

	const handleSelectTrip = async (tripId: string) => {
		if (hotel.id) {
			await addItemToTrip({ tripId, item: { type: 'hotel', itemId: hotel.id } });
		} else {
			const currentHotel = await createHotel(hotel).unwrap();
			if (currentHotel) {
				console.log('Hotel created:', currentHotel);
				await addItemToTrip({ tripId, item: { type: 'hotel', itemId: currentHotel.id! } });
			}
		}
		setAddToTripModalVisible(false);
	};

	const handleCreateNewTrip = async () => {
		await createTrip({ userId: "1", name: hotel.city, when: hotel.checkInDate + ' to ' + hotel.checkOutDate });
	};

	const handleAddToFavorites = async (e: any) => {
		e.stopPropagation();
		await createHotel(hotel).unwrap();
	};

	const handleDeleteHotel = async (e: any) => {
		e.stopPropagation();
		if (confirm(`Are you sure you want to delete "${hotel.name}"?`)) {
			try {
				await deleteHotel(hotel.id!);
			} catch (error) {
				console.error('Failed to delete hotel:', error);
			}
		}
	};

	return (
		<>
			<Pressable onPress={() => setModalVisible(true)}>
				<View style={styles.card}>
					{/* Action buttons - positioned absolutely in top-right corner */}
					<View style={styles.actionButtonsContainer}>
						<TouchableOpacity
							style={styles.actionButton}
							onPress={handleAddToTrip}
						>
							<Text style={styles.actionButtonText}>➕</Text>
						</TouchableOpacity>

						{/* Only show heart button if not already saved */}
						{!isSaved && (
							<TouchableOpacity
								style={styles.actionButton}
								onPress={handleAddToFavorites}
							>
								<Text style={styles.actionButtonText}>❤️</Text>
							</TouchableOpacity>
						)}

						{/* Show delete button if saved */}
						{isSaved && (
							<TouchableOpacity
								style={styles.actionButton}
								onPress={handleDeleteHotel}
							>
								<Text style={[styles.actionButtonText, { color: '#d63b3bff' }]}>✕</Text>
							</TouchableOpacity>
						)}
					</View>

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

			{/* Hotel Details Modal */}
			<Modal
				visible={modalVisible}
				animationType="slide"
				transparent={true}
				onRequestClose={() => setModalVisible(false)}
			>
				<View style={styles.modalOverlay}>
					{isLoading ? (
						<ActivityIndicator size="large" color="#1976d2" />
					) : (
						<View style={styles.modalContent}>
							{hotelDetails ? (
								<>
									<HotelDetails hotel={hotel} rates={hotelDetails.rates} currency={hotelDetails.currency} />
									<Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
										<Text style={{ color: '#fff' }}>Close</Text>
									</Pressable>
								</>
							) : (
								<Text>Failed to load hotel details.</Text>
							)}
						</View>
					)}
				</View>
			</Modal>

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
		position: 'relative', // Add for absolute positioning
	},
	actionButtonsContainer: {
		position: 'absolute',
		top: 8,
		right: 8,
		flexDirection: 'row',

		zIndex: 1,
	},
	actionButton: {
		backgroundColor: 'rgba(255, 255, 255, 0.9)',
		padding: 4
	},
	actionButtonText: {
		fontSize: 18,
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
		paddingRight: 80, // Add space for action buttons
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
		width: 700,
		backgroundColor: '#fff',
		borderRadius: 16,
		padding: 20,
		alignItems: 'center',
		maxHeight: '80%',
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