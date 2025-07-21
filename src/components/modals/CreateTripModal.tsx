import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface CreateTripModalProps {
    visible: boolean;
    onClose: () => void;
    onCreate: (tripName: string, when: string) => void;
    loading?: boolean;
}

const CreateTripModal: React.FC<CreateTripModalProps> = ({ visible, onClose, onCreate, loading }) => {
    const [tripName, setTripName] = useState('');
    const [tripWhen, setTripWhen] = useState('');

    const handleCreate = () => {
        if (tripName.trim()) {
            onCreate(tripName.trim(), tripWhen.trim());
            setTripName('');
            setTripWhen('');
        }
    };

    const handleClose = () => {
        setTripName('');
        setTripWhen('');
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
            <View style={styles.overlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Create New Trip</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={tripName}
                        onChangeText={setTripName}
                        editable={!loading}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="When"
                        value={tripWhen}
                        onChangeText={setTripWhen}
                        editable={!loading}
                    />
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.button} onPress={handleClose} disabled={loading}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: '#1976d2' }]}
                            onPress={handleCreate}
                            disabled={!tripName.trim() || loading}
                        >
                            <Text style={[styles.buttonText, { color: '#fff' }]}>Create</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.35)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '30%',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        elevation: 6,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#1976d2',
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        marginBottom: 20,
        backgroundColor: '#f9f9f9',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 8,
        marginLeft: 10,
        backgroundColor: '#eee',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1976d2',
    },
});

export default CreateTripModal;