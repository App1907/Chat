import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image, TouchableWithoutFeedback } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../utils/dimension';
import { Icons } from '../assets';
import DeleteChatModal from './deletechatmodal';

interface ChatOptionsModalProps {
  visible: boolean;
  onClose: () => void;
}

const ChatOptionsModal: React.FC<ChatOptionsModalProps> = ({
  visible,
  onClose,
}) => {
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleDelete = () => {
    setDeleteModalVisible(true);
    onClose(); // Close the options modal when deleting
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.container}>
                <TouchableOpacity>
                  <View style={styles.row}>
                    <Image source={Icons.eye} style={styles.img} />
                    <Text style={styles.optionText}>View Details</Text>
                  </View>
                  <View style={styles.line} />
                </TouchableOpacity>

                <TouchableOpacity>
                  <View style={styles.row}>
                    <Image source={Icons.pinchat} style={styles.img} />
                    <Text style={styles.optionText}>Pin Chat</Text>
                  </View>
                  <View style={styles.line} />
                </TouchableOpacity>

                <TouchableOpacity>
                  <View style={styles.row}>
                    <Image source={Icons.searchchat} style={styles.img} />
                    <Text style={styles.optionText}>Search Chat</Text>
                  </View>
                  <View style={styles.line} />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleDelete}>
                  <View style={styles.row}>
                    <Image source={Icons.delete} style={styles.img} />
                    <Text style={[styles.optionText, { color: 'red' }]}>Delete</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <DeleteChatModal
        visible={isDeleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        imageSource={Icons.delete} // Assuming Icons.delete is the correct image
        headerText="Delete Chat"
        subText="Are you sure you want to delete this chat?"
        ButtonText1="No, Cancel"
        ButtonText2="Yes, Delete"
      />
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: SCREEN_WIDTH * 0.06106870229,
    paddingBottom: SCREEN_HEIGHT * 0.07042253521,
    paddingTop: SCREEN_HEIGHT * 0.02816901408,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.35521688159,
  },
  optionText: {
    fontSize: SCREEN_HEIGHT * 0.01877934272,
    color: '#3A4F5F',
    marginLeft: SCREEN_WIDTH * 0.03053435114,
    lineHeight: 20.8,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
  },
  img: {
    height: SCREEN_HEIGHT * 0.02816901408,
    width: SCREEN_WIDTH * 0.06106870229,
    resizeMode: 'contain',
  },
  line: {
    width: SCREEN_WIDTH * 0.33587786259,
    backgroundColor: '#e3e5e8',
    height: 1,
    marginTop: SCREEN_HEIGHT * 0.0234741784,
    marginBottom: SCREEN_HEIGHT * 0.0234741784,
  },
});

export default ChatOptionsModal;