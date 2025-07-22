import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import HotelComponent from '../components/Hotel';

export default function Hotels() {
    const hotels = useSelector((state: RootState) => state.travel.hotels);

    // Show placeholder when no hotels are found
    if (hotels.length === 0) {
        return (
            <View style={styles.container}>
                <View style={styles.emptyStateContainer}>
                    <Text style={styles.emptyStateIcon}>🏢</Text>
                    <Text style={styles.emptyStateTitle}>No hotels searched</Text>
                    <Text style={styles.emptyStateSubtitle}>
                        Search for hotels from the home screen to see results here
                    </Text>
                </View>
            </View>
        );
    }

    const pageHeader = `Hotels that matched your search in ${hotels[0].city}`;
    const leftHotels = hotels.slice(0, 5);
    const rightHotels = hotels.slice(5, 10);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{pageHeader}</Text>
            <ScrollView contentContainerStyle={styles.columnsContainer}>
                <View style={styles.column}>
                    {leftHotels.map(hotel => (
                        <HotelComponent key={hotel.key} hotel={hotel} />
                    ))}
                </View>
                <View style={styles.column}>
                    {rightHotels.map(hotel => (
                        <HotelComponent key={hotel.key} hotel={hotel} />
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