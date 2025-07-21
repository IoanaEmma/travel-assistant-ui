import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import TripCard from '../components/Trip';
import TripDetailsModal from '../components/modals/TripDetailsModal';
import CreateTripModal from '../components/modals/CreateTripModal';
import { Trip, TripDetails } from '../types/travel';
import { useGetTripsQuery, useLazyGetTripDetailsQuery, useCreateTripMutation, useUpdateTripMutation } from '../features/trip/tripApi';
import { useRouter } from 'expo-router';

const TABS = ['Active', 'Completed', 'Canceled'] as const;
type TabType = typeof TABS[number];
const router = useRouter();

export default function Trips() {
	const { data: trips = [], isLoading } = useGetTripsQuery("1");
	const [modalVisible, setModalVisible] = useState(false);
	const [createModalVisible, setCreateModalVisible] = useState(false);
	const [getTripDetails, { data: tripDetails, isLoading: isDetailsLoading }] = useLazyGetTripDetailsQuery();
	const [createTrip, { isLoading: isCreating }] = useCreateTripMutation();
	const [updateTrip, { isLoading: isUpdating }] = useUpdateTripMutation();
	const [selectedTab, setSelectedTab] = useState<TabType>('Active');

	const handleTripPress = async (trip: Trip) => {
		await getTripDetails({ userId: "1", tripId: trip.id });
		router.push(`/trip/${trip.id}`);
		// setModalVisible(true);
	};

	const handleCreateTrip = () => {
		setCreateModalVisible(true);
	};

	const handleCreateTripSubmit = async (tripName: string, when: string) => {
		await createTrip({ userId: "1", name: tripName, when: when });
		setCreateModalVisible(false);
	};

	const handleTripComplete = async (trip: Trip) => {
		const updatedTrip = { ...trip, status: 'completed' };
		await updateTrip(updatedTrip);
		await getTripDetails({ userId: "1", tripId: trip.id });
	};

	const handleTripCancel = async (trip: Trip) => {
		const updatedTrip = { ...trip, status: 'canceled' };
		await updateTrip(updatedTrip);
		await getTripDetails({ userId: "1", tripId: trip.id });
	}

	const renderTrip = ({ item }: { item: Trip }) => (
		<TripCard trip={item} onPress={() => handleTripPress(item)} onComplete={() => handleTripComplete(item)}
			onCancel={() => handleTripCancel(item)} />

	);

	// Filter trips based on selected tab
	const filteredTrips = trips.filter(trip => {
		if (selectedTab === 'Active') return trip.status === 'active' || !trip.status;
		if (selectedTab === 'Completed') return trip.status === 'completed';
		if (selectedTab === 'Canceled') return trip.status === 'canceled';
		return true;
	});

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Trips</Text>

			{/* Tabs */}
			<View style={styles.tabsContainer}>
				{TABS.map(tab => (
					<TouchableOpacity
						key={tab}
						style={[
							styles.tab,
							selectedTab === tab && styles.tabSelected
						]}
						onPress={() => setSelectedTab(tab)}
					>
						<Text style={[
							styles.tabText,
							selectedTab === tab && styles.tabTextSelected
						]}>
							{tab}
						</Text>
					</TouchableOpacity>
				))}
			</View>

			{isLoading ? (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color="#1976d2" />
				</View>
			) : filteredTrips.length === 0 ? (
				<View style={styles.placeholderContainer}>
					<Text style={styles.placeholderIcon}>🧳</Text>
					<Text style={styles.empty}>No trips yet</Text>
				</View>
			) : (
				<FlatList
					data={filteredTrips}
					keyExtractor={item => item.id}
					renderItem={renderTrip}
					numColumns={4}
					columnWrapperStyle={{ justifyContent: 'flex-start' }}
					contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 20, marginTop: 16 }}
				/>
			)}
			<TouchableOpacity style={styles.createButton} onPress={handleCreateTrip}>
				<Text style={styles.createButtonText}>+ Create New Trip</Text>
			</TouchableOpacity>
			<TripDetailsModal
				visible={modalVisible}
				onClose={() => setModalVisible(false)}
				trip={tripDetails as TripDetails}
			/>
			<CreateTripModal
				visible={createModalVisible}
				onClose={() => setCreateModalVisible(false)}
				onCreate={handleCreateTripSubmit}
				loading={isCreating}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16, backgroundColor: '#f0f4f8' },
	title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
	tabsContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		marginBottom: 12,
	},
	tab: {
		paddingVertical: 8,
		paddingHorizontal: 20,
		borderRadius: 20,
		backgroundColor: '#e3eafc',
		marginHorizontal: 4,
	},
	tabSelected: {
		backgroundColor: '#1976d2',
	},
	tabText: {
		color: '#1976d2',
		fontWeight: 'bold',
	},
	tabTextSelected: {
		color: '#fff',
	},
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
	}
});