import React from 'react';
import { View, Text, Modal, TouchableOpacity, Image, StyleSheet, TouchableWithoutFeedback, Alert } from 'react-native';
import { Icons } from '../assets'; 

interface MessageOptionsModalProps {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
  message: any;
  setMessages: React.Dispatch<React.SetStateAction<any[]>>;
  messages: any[];
  showDeleteModal: boolean;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const reactions = ['👍', '❤️', '😂', '🎉', '👎']; 

const MessageOptionsModal: React.FC<MessageOptionsModalProps> = ({
  visible,
  onClose,
  onDelete,
  message,
  setMessages,
  messages,
  showDeleteModal,
  setShowDeleteModal,
}) => {
  

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


  const confirmDelete = () => {
    Alert.alert(
      "Delete message?",
      "Are you sure you want to delete this\nmessage?",
      [
        { text: "No, Cancel", style: "cancel" },
        { text: "Yes, Delete", onPress: onDelete, style: "destructive" }
      ]
    );
  };


  // const handleDeletePress = () => {
  //   setShowDeleteModal(true); 
  // };


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
              <TouchableOpacity style={styles.option} onPress={confirmDelete}>
                <Image source={Icons.deleteChat} style={styles.icon} />
                <Text style={[styles.optionText, { color: 'red' }]}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>

    
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


  reactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  reactionButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 5,
  },
  reactionEmoji: {
    fontSize: 24,
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


  deleteModalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  deleteModalContent: {
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

export default MessageOptionsModal;
