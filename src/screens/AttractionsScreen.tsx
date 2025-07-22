import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import AttractionComponent from '../components/Attraction';

export default function Attractions() {
    const attractions = useSelector((state: RootState) => state.travel.attractions);

    // Show placeholder when no attractions are found
    if (attractions.length === 0) {
        return (
            <View style={styles.container}>
                <View style={styles.emptyStateContainer}>
                    <Text style={styles.emptyStateIcon}>🎡</Text>
                    <Text style={styles.emptyStateTitle}>No attractions searched</Text>
                    <Text style={styles.emptyStateSubtitle}>
                        Search for attractions from the home screen to see results here
                    </Text>
                </View>
            </View>
        );
    }

    const pageHeader = `Attractions that matched your search`;
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