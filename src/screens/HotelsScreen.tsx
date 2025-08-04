import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import HotelComponent from '../components/Hotel';
import { useEffect, useState } from 'react';
import { useGetHotelsByCityQuery, useGetHotelsCitiesQuery } from '../features/hotel/hotelApi'; // Add this import

type TabType = 'Search' | 'Saved';

export default function Hotels() {
    const [activeTab, setActiveTab] = useState<TabType>('Search');
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const hotels = useSelector((state: RootState) => state.travel.hotels);

    // API call for saved hotels
    const { data: savedHotels, isLoading: savedHotelsLoading } = useGetHotelsByCityQuery(undefined);
    const { data: cities } = useGetHotelsCitiesQuery();

    // Get the current data based on active tab
    const getFilteredHotels = () => {
        const baseHotels = activeTab === 'Search' ? hotels : (savedHotels || []);
        if (selectedCity && activeTab === 'Saved') {
            return baseHotels.filter(hotel => hotel.city === selectedCity);
        }
        return baseHotels;
    }
    const currentHotels = getFilteredHotels();

    useEffect(() => {
        if (activeTab === 'Search') {
            setSelectedCity(null);
        }
    }, [activeTab]);

    const handleCityPress = (city: string) => {
        setSelectedCity(selectedCity === city ? null : city);
    };

    // Show placeholder when no hotels are found
    const renderEmptyState = () => {
        const emptyContent = activeTab === 'Search'
            ? {
                icon: '🏢',
                title: 'No hotels searched',
                subtitle: 'Search for hotels from the home screen to see results here'
            }
            : {
                icon: '💾',
                title: 'No saved hotels',
                subtitle: 'Add hotels to your saved list by clicking the heart icon'
            };

        return (
            <View style={styles.emptyStateContainer}>
                <Text style={styles.emptyStateIcon}>{emptyContent.icon}</Text>
                <Text style={styles.emptyStateTitle}>{emptyContent.title}</Text>
                <Text style={styles.emptyStateSubtitle}>{emptyContent.subtitle}</Text>
            </View>
        );
    };

    const renderCityChips = () => {
        if (activeTab !== 'Saved' || !cities || cities.length === 0) {
            return null;
        }

        return (
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.chipsContainer}
                contentContainerStyle={styles.chipsContent}
            >
                {cities.map((city, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.chip,
                            selectedCity === city && styles.chipSelected
                        ]}
                        onPress={() => handleCityPress(city)}
                    >
                        <Text style={[
                            styles.chipText,
                            selectedCity === city && styles.chipTextSelected
                        ]}>
                            {city}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        );
    };

    const renderHotels = () => {
        if (currentHotels.length === 0) {
            return renderEmptyState();
        }

        const leftHotels = currentHotels.slice(0, Math.ceil(currentHotels.length / 2));
        const rightHotels = currentHotels.slice(Math.ceil(currentHotels.length / 2));

        return (
            <ScrollView contentContainerStyle={styles.columnsContainer}>
                <View style={styles.column}>
                    {leftHotels.map((hotel, index) => (
                        <HotelComponent
                            key={hotel.key || `${hotel.name}-${index}`}
                            hotel={hotel}
                            isSaved={hotel.id ? true : false}

                        />
                    ))}
                </View>
                <View style={styles.column}>
                    {rightHotels.map((hotel, index) => (
                        <HotelComponent
                            key={hotel.key || `${hotel.name}-${index}`}
                            hotel={hotel}
                            isSaved={hotel.id ? true : false}

                        />
                    ))}
                </View>
            </ScrollView>
        );
    };

    return (
        <View style={styles.container}>


            {/* Tabs - TripsScreen style */}
            <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Search' && styles.tabSelected]}
                    onPress={() => setActiveTab('Search')}
                >
                    <Text style={[styles.tabText, activeTab === 'Search' && styles.tabTextSelected]}>
                        Search
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Saved' && styles.tabSelected]}
                    onPress={() => setActiveTab('Saved')}
                >
                    <Text style={[styles.tabText, activeTab === 'Saved' && styles.tabTextSelected]}>
                        Saved
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Tab Content */}
            <View style={styles.contentContainer}>
                <Text style={styles.title}>
                    {activeTab === 'Search'
                        ? 'Hotels that matched your search'
                        : 'Your saved hotels'
                    }
                </Text>
                {/* City Chips - Only show on Saved tab */}
                {renderCityChips()}
                {renderHotels()}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    screenTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    tabsContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    tab: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        marginRight: 8,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    tabSelected: {
        borderBottomColor: '#1976d2',
    },
    tabText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
    },
    tabTextSelected: {
        color: '#1976d2',
        fontWeight: 'bold',
    },
    contentContainer: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333',
    },
    chipsContainer: {
        marginBottom: 16,
        maxHeight: 40,
    },
    chipsContent: {
        paddingHorizontal: 4,
    },
    chip: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 20,
        marginRight: 8,
        marginVertical: 4,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    chipSelected: {
        backgroundColor: '#1976d2',
        borderColor: '#1976d2',
    },
    chipText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    chipTextSelected: {
        color: '#fff',
        fontWeight: 'bold',
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