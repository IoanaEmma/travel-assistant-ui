import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Trip } from '../../types/travel';

interface AddToTripModalProps {
  visible: boolean;
  onClose: () => void;
  activeTrips: Trip[];
  onSelectTrip: (tripId: string) => void;
  onCreateNewTrip: () => void;
}

const AddToTripModal: React.FC<AddToTripModalProps> = ({
  visible,
  onClose,
  activeTrips,
  onSelectTrip,
  onCreateNewTrip,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

  const handleSelectTrip = (trip: Trip) => {
    setSelectedTrip(trip);
    setDropdownVisible(false);
  };

  const handleConfirmSelection = () => {
    if (selectedTrip) {
      onSelectTrip(selectedTrip.id);
      setSelectedTrip(null);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add item to Trip</Text>

          {activeTrips.length > 0 ? (
            <>


              {/* Dropdown and Create New Trip Button Row */}
              <View style={styles.dropdownRow}>
                <View style={styles.dropdownContainer}>
                  <TouchableOpacity
                    style={styles.dropdownButton}
                    onPress={() => setDropdownVisible(!dropdownVisible)}
                  >
                    <Text style={styles.dropdownButtonText}>
                      {selectedTrip ? selectedTrip.name : 'Select an existing trip'}
                    </Text>
                    <View style={styles.dropdownButtonRight}>
                      {selectedTrip && (
                        <TouchableOpacity
                          style={styles.clearButton}
                          onPress={(e) => {
                            e.stopPropagation(); // Prevent dropdown from opening/closing
                            setSelectedTrip(null);
                          }}
                        >
                          <Text style={styles.clearButtonText}>✕</Text>
                        </TouchableOpacity>
                      )}
                      <Text style={styles.dropdownArrow}>
                        {dropdownVisible ? '▲' : '▼'}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  {dropdownVisible && (
                    <View style={styles.dropdownList}>
                      <ScrollView style={styles.dropdownScrollView}>
                        {activeTrips.map((trip) => (
                          <TouchableOpacity
                            key={trip.id}
                            style={styles.dropdownItem}
                            onPress={() => handleSelectTrip(trip)}
                          >
                            <Text style={styles.dropdownItemText}>{trip.name}</Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  )}
                </View>

                <TouchableOpacity
                  style={styles.createTripButton}
                  onPress={onCreateNewTrip}
                >
                  <Text style={styles.createTripButtonText}>+ Create New Trip</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.noTripsText}>No active trips found</Text>
              <TouchableOpacity
                style={styles.createTripButton}
                onPress={onCreateNewTrip}
              >
                <Text style={styles.createTripButtonText}>+ Create New Trip</Text>
              </TouchableOpacity>
            </>
          )}

          {/* Bottom Buttons Row */}
          <View style={styles.bottomButtonsRow}>
            {selectedTrip && (
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirmSelection}
              >
                <Text style={styles.confirmButtonText}>
                  Add to {selectedTrip.name}
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    dropdownButtonRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  clearButton: {
    backgroundColor: '#ff4444',
    borderRadius: 12,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  modalContent: {
    width: 500,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    maxHeight: '80%',
    position: 'relative',
    zIndex: 2,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
    color: '#1976d2',
  },
  dropdownRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 30,
    position: 'relative',
    zIndex: 10,
  },
  dropdownContainer: {
    flex: 1,
    position: 'relative',
    zIndex: 10,
  },
  dropdownButton: {
    backgroundColor: '#f0f4f8',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    minHeight: 52,
    width: 200
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#1976d2',
    flex: 1,
  },
  dropdownArrow: {
    fontSize: 16,
    color: '#1976d2',
  },
  dropdownList: {
    position: 'absolute',
    top: 50, // Position above the button instead of below
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    maxHeight: 140,
    zIndex: 99999,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 }, // Shadow pointing upward
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  dropdownScrollView: {
    maxHeight: 140,
  },
  dropdownItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    minHeight: 48,
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  noTripsText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  createTripButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    height: 52,
  },
  createTripButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  bottomButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    gap: 10,
    zIndex: 1, // Lower z-index for bottom buttons
  },
  confirmButton: {
    backgroundColor: '#1976d2',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#888',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AddToTripModal;