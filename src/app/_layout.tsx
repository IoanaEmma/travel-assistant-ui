import { Slot, useRouter } from 'expo-router';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import SideNav from '../components/SideNav';
import { Provider } from 'react-redux';
import { store } from '../store';

export default function Layout() {
  const router = useRouter();

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <View style={styles.navBar}>
          <Pressable onPress={() => router.push('/')}>
            <Text style={styles.navTitle}>Smart Travel Assistant</Text>
          </Pressable>
        </View>
        <View style={styles.body}>
          <SideNav />
          <View style={styles.content}>
            <Slot />
          </View>
        </View>
      </View>
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  navBar: {
    height: 56,
    backgroundColor: '#1976d2',
    justifyContent: 'center',
    alignItems: 'flex-start',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  navTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 32,
  },
  body: {
    flex: 1,
    flexDirection: 'row',
  },
  content: {
    flex: 1,
    padding: 16,
  },
});