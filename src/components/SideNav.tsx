import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const tabs = [
    { label: 'Trips', route: '/trip' },
    { label: 'Flights', route: '/flights' },
    { label: 'Hotels', route: '/hotels' },
    { label: 'Local Attractions', route: '/attractions' },
    { label: 'Weather', route: '/weather' },
];

export default function SideNav() {
    const router = useRouter();

    return (
        <View style={styles.nav}>
            {tabs.map((tab) => (
                <Pressable key={tab.route} onPress={() => router.push(tab.route)} style={styles.button}>
                    <Text style={styles.text}>{tab.label}</Text>
                </Pressable>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    nav: {
        width: 250,
        backgroundColor: '#f0f0f0',
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 8,
        marginBottom: 8,
        borderRadius: 6,
        backgroundColor: '#e0e0e0',
    },
    text: {
        fontSize: 16,
    },
});
