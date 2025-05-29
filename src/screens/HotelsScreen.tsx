import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import HotelComponent from '../components/Hotel';

export default function Hotels() {
    const hotels = useSelector((state: RootState) => state.travel.hotels);
    const pageHeader = hotels.length > 0 ? `Hotels that matched your search in ${hotels[0].city}` : 'No hotels searched';

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
});