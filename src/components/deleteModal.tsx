import React from 'react';
import { Modal, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../utils/dimension';

interface DeleteMessageModalProps {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
  imageSource: any; 
  headerText: string; 
  subText: string; 
  ButtonText1: string; 
  ButtonText2: string; 
}

const DeleteMessageModal: React.FC<DeleteMessageModalProps> = ({
  visible,
  onClose,
  onDelete,
  imageSource,
  headerText,
  subText,
  ButtonText1,
  ButtonText2,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image source={imageSource} style={styles.image} />

          <Text style={styles.headerText}>{headerText}</Text>
          <Text style={styles.subText}>{subText}</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>{ButtonText1}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteButton} onPress={onDelete} >
              <Text style={styles.deleteButtonText}>{ButtonText2}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContent: {
    width: SCREEN_WIDTH * 0.87786259542,
    height: SCREEN_HEIGHT * 0.30291079812,
    paddingVertical: SCREEN_HEIGHT * 0.03286384976,
    backgroundColor: '#fff',
    borderRadius: 16,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 16,
    resizeMode: 'contain',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 6,
    color: '#3A4F5F',
    lineHeight: 26,
  },
  subText: {
    fontSize: 13,
    color: '#60707D',
    textAlign: 'center',
    marginBottom: 28,
    fontWeight: '400',
    lineHeight: 19.5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#f6f7f7',
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
    width: 100,
    height: 48,
    justifyContent: 'center',
    marginLeft:38,

  },
  cancelButtonText: {
    fontSize: 14,
    color: '#3A4F5F',
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: '#2A7BBB',
    justifyContent: 'center',
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
    width: 100,
    height: 48,
    marginRight:38,
  },
  deleteButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
});

export default DeleteMessageModal;