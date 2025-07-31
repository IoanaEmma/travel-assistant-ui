import React from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { Trip } from '../types/travel';

interface TripProps {
    trip: Trip;
    onPress?: () => void;
    onComplete?: () => void;
    onCancel?: () => void;
    onActive?: () => void;
    onDelete: () => void;
}

const statusIcon = (status?: string) => {
    switch (status) {
        case 'completed':
            return '✅';
        case 'canceled':
            return '❌';
        default:
            return '🔄';
    }
};

const TripCard: React.FC<TripProps> = ({ trip, onPress, onComplete, onCancel, onActive, onDelete }) => (
    <Pressable onPress={onPress}>
        <View style={styles.card}>
            <View style={styles.textContainer}>
                <Text style={styles.name}>{trip.name}</Text>
                <Text style={styles.when}> {trip.when || ' '}</Text>
                <View style={styles.btnWrapper}>
                    {trip.status === 'active' && (
                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                style={[styles.actionButton, styles.completeButton]}
                                onPress={onComplete}
                            >
                                <Text style={styles.buttonText}>Complete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.actionButton, styles.cancelButton]}
                                onPress={onCancel}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {trip.status === 'canceled' && (
                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                style={[styles.actionButton, styles.completeButton]}
                                onPress={onActive}
                            >
                                <Text style={styles.buttonText}>Active</Text>
                            </TouchableOpacity>
                            
                        </View>
                    )}
                    {trip.status === 'completed' && (
                        <View style={styles.buttonRow}>
                            
                            <TouchableOpacity
                                style={[styles.actionButton, styles.cancelButton]}
                                onPress={onCancel}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    <TouchableOpacity style={styles.deleteIconButton} onPress={onDelete}>
                        <Text style={styles.deleteIcon}>🗑</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.statusIconContainer}>
                <Text style={styles.statusIcon}>{statusIcon(trip.status)}</Text>
            </View>
        </View>
    </Pressable>
);

const styles = StyleSheet.create({
    btnWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    deleteIconButton: {
        backgroundColor: '#fff', // Blue background
        borderRadius: 12,
        width: 28,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteIcon: {
        marginTop: 8,
        fontSize: 22,
        color: '#1976d2'
    },
    deleteButton: {
        backgroundColor: '#f44336',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
        flex: 1,
    },
    card: {
        width: 300,
        minHeight: 100,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginVertical: 12,
        marginHorizontal: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        position: 'relative',
    },
    textContainer: {
        flex: 1,
        paddingRight: 0,
    },
    name: {
        marginLeft: 6,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1976d2',
    },
    when: {
        fontSize: 12,
        color: '#888',
        marginTop: 2,
        marginBottom: 8,
        marginLeft: 6
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 8,
    },
    actionButton: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 6,
        marginRight: 6,
    },
    completeButton: {
        backgroundColor: '#1976d2',
    },
    cancelButton: {
        backgroundColor: '#888888',
    },
    buttonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    statusIconContainer: {
        position: 'absolute',
        right: 8,
        top: 6,
    },
    statusIcon: {
        fontSize: 20,
    },
});

export default TripCard;