import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import AttractionComponent from '../components/Attraction';

export default function Attractions() {
    const attractions = useSelector((state: RootState) => state.travel.attractions);
    const pageHeader = attractions.length > 0 ? `Attractions that matched your search` : 'No attractions searched';

    const leftAttractions = attractions.slice(0, 5);
    const rightAttractions = attractions.slice(5, 10);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{pageHeader}</Text>
            <ScrollView contentContainerStyle={styles.columnsContainer}>
                <View style={styles.column}>
                    {leftAttractions.map(attraction => (
                        <AttractionComponent key={attraction.name} attraction={attraction} />
                    ))}
                </View>
                <View style={styles.column}>
                    {rightAttractions.map(attraction => (
                        <AttractionComponent key={attraction.name} attraction={attraction} />
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