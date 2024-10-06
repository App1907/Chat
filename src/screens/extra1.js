import React from 'react';
import { View, Text, Modal, TouchableOpacity, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';

interface MessageOptionsModalProps {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
  message: any;
  setMessages: React.Dispatch<React.SetStateAction<any[]>>;
  messages: any[];
  showDeleteModal: boolean; // Add a state to control delete modal visibility
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>; // Add setter function
}

const reactions = ['👍', '❤️', '😂', '🎉', '👎']; // Reactions from the image

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
  
  // Handle adding/removing reactions
  const handleReaction = (reaction: string) => {
    const updatedMessages = messages.map((msg) => {
      if (msg._id === message._id) {
        if (msg.reactions && msg.reactions.includes(reaction)) {
          // Remove reaction if it already exists
          msg.reactions = msg.reactions.filter((r: string) => r !== reaction);
        } else {
          // Add reaction
          msg.reactions = [...(msg.reactions || []), reaction];
        }
      }
      return msg;
    });
    setMessages(updatedMessages);
    onClose();
  };

  const handleDeletePress = () => {
    setShowDeleteModal(true); // Show delete modal when Delete is pressed
  };

  return (
    <>
      <Modal visible={visible} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              {/* Reaction options */}
              <View style={styles.reactionsRow}>
                {reactions.map((reaction, index) => (
                  <TouchableOpacity key={index} onPress={() => handleReaction(reaction)}>
                    <Text style={styles.reaction}>{reaction}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Modal Options (Reply, Forward, etc.) */}
              <View style={styles.modalOptions}>
                <TouchableOpacity style={styles.option}>
                  <Image source={{ uri: 'reply_icon_uri' }} style={styles.icon} />
                  <Text style={styles.optionText}>Reply</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                  <Image source={{ uri: 'forward_icon_uri' }} style={styles.icon} />
                  <Text style={styles.optionText}>Forward</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                  <Image source={{ uri: 'copy_icon_uri' }} style={styles.icon} />
                  <Text style={styles.optionText}>Copy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                  <Image source={{ uri: 'star_icon_uri' }} style={styles.icon} />
                  <Text style={styles.optionText}>Star</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                  <Image source={{ uri: 'edit_icon_uri' }} style={styles.icon} />
                  <Text style={styles.optionText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option} onPress={handleDeletePress}>
                  <Image source={{ uri: 'delete_icon_uri' }} style={styles.icon} />
                  <Text style={[styles.optionText, { color: 'red' }]}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <Modal visible={showDeleteModal} transparent animationType="fade">
          <View style={styles.deleteModalBackground}>
            <View style={styles.deleteModalContent}>
              <View style={styles.deleteIconContainer}>
                <Image source={{ uri: 'delete_icon_uri' }} style={styles.deleteIcon} />
              </View>
              <Text style={styles.deleteTitle}>Delete message?</Text>
              <Text style={styles.deleteSubtitle}>Are you sure you want to delete this message?</Text>

              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setShowDeleteModal(false)}>
                  <Text style={styles.cancelButtonText}>No, Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
                  <Text style={styles.deleteButtonText}>Yes, Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
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
