import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Icons } from '../assets';

interface DeleteMessageModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
}

const DeleteMessageModal: React.FC<DeleteMessageModalProps> = ({
  visible,
  onClose,
  onConfirmDelete,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <View style={styles.deleteIconContainer}>
            <Image source={Icons.deleteChat} style={styles.deleteIcon} />
          </View>
          <Text style={styles.deleteTitle}>Delete message?</Text>
          <Text style={styles.deleteSubtitle}>
            Are you sure you want to delete this message?
          </Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>No, Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={onConfirmDelete}>
              <Text style={styles.deleteButtonText}>Yes, Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  deleteIconContainer: {
    backgroundColor: '#FCE7E7',
    padding: 15,
    borderRadius: 50,
    marginBottom: 20,
  },
  deleteIcon: {
    width: 40,
    height: 40,
  },
  deleteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  deleteSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    marginRight: 10,
    backgroundColor: '#E5E5E5',
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#4A4A4A',
  },
  deleteButton: {
    flex: 1,
    padding: 12,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default DeleteMessageModal;
