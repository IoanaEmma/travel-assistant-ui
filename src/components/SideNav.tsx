import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';

const tabs = [
    { label: 'Home', route: '/home' },
    { label: 'Flights', route: '/flights' },
    { label: 'Hotels', route: '/hotels' },
    { label: 'Attractions', route: '/attractions' },
    { label: 'Trips', route: '/trip' },
];

export default function SideNav() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <View style={styles.nav}>
            {tabs.map((tab) => {
                const isActive = pathname.includes(tab.route);
                return (
                    <Pressable
                        key={tab.route}
                        onPress={() => router.push(tab.route)}
                        style={[
                            styles.button,
                            isActive && styles.activeButton
                        ]}
                    >
                        <Text style={[
                            styles.text,
                            isActive && styles.activeText
                        ]}>
                            {tab.label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    nav: {
        width: 350,
        backgroundColor: '#f0f0f0',
        paddingVertical: 20,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 8,
        marginBottom: 8,
        borderRadius: 6,
        backgroundColor: '#e0e0e0',
        width: 300,
        
    },
    activeButton: {
        backgroundColor: '#1976d2',
    },
    text: {
        fontSize: 16,
        color: '#222',
    },
    activeText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});