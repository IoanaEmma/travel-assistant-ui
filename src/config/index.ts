import Constants from 'expo-constants';

const extra =
    Constants.expoConfig?.extra ||
    // For classic Expo Go and some production builds:
    Constants.manifest?.extra ||
    {};

export default {
    API_URL: extra.API_URL || 'https://api.example.com',
}