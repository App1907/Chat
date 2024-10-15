import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icons } from '../assets';
import DeleteMessageModal from './deleteModal';

interface MessageOptionsModalProps {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
  message: any;
  setMessages: React.Dispatch<React.SetStateAction<any[]>>;
  messages: any[];
  contact: string; 
}

const reactions = ['👍', '❤️', '😂', '🎉', '👎'];

const MessageOptionsModal: React.FC<MessageOptionsModalProps> = ({
  visible,
  onClose,
  message,
  setMessages,
  messages,
  contact,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleReaction = (reaction: string) => {
    const updatedMessages = messages.map((msg) => {
      if (msg._id === message._id) {
        if (msg.reactions && msg.reactions.includes(reaction)) {
          msg.reactions = msg.reactions.filter((r: string) => r !== reaction);
        } else {
          msg.reactions = [...(msg.reactions || []), reaction];
        }
      }
      return msg;
    });
    setMessages(updatedMessages);
    onClose();
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
    onClose(); 
  };

  const handleDeleteConfirm = async () => {
    const updatedMessages = messages.filter((msg) => msg._id !== message._id);
    setMessages(updatedMessages);
    setShowDeleteModal(false); 


    try {
      await AsyncStorage.setItem(contact, JSON.stringify(updatedMessages));
    } catch (error) {
      console.log('Error updating messages in AsyncStorage: ', error);
    }
  };

  return (
    <>

      <Modal visible={visible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <View style={styles.reactionsRow}>
                {reactions.map((reaction, index) => (
                  <TouchableOpacity key={index} onPress={() => handleReaction(reaction)}>
                    <Text style={styles.reaction}>{reaction}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.modalOptions}>
                <TouchableOpacity style={styles.option}>
                  <Image source={Icons.reply} style={styles.icon} />
                  <Text style={styles.optionText}>Reply</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                  <Image source={Icons.forward} style={styles.icon} />
                  <Text style={styles.optionText}>Forward</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                  <Image source={Icons.copy} style={styles.icon} />
                  <Text style={styles.optionText}>Copy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                  <Image source={Icons.star} style={styles.icon} />
                  <Text style={styles.optionText}>Star</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                  <Image source={Icons.edit} style={styles.icon} />
                  <Text style={styles.optionText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option} onPress={openDeleteModal}>
                  <Image source={Icons.deleteChat} style={styles.icon} />
                  <Text style={[styles.optionText, { color: 'red' }]}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>


      <DeleteMessageModal
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirmDelete={handleDeleteConfirm}
      />
    </>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  reactionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  reaction: {
    fontSize: 28,
  },
  modalOptions: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  optionText: {
    fontSize: 16,
    color: '#4A4A4A',
  },
});

export default MessageOptionsModal;
