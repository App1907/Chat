import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { Icons } from '../../assets'; // Import icons for the header part
import { useRoute } from '@react-navigation/native';
import MessageOptionsModal from '../../components/messageOptions';


interface ChatRoomScreenProps {
  route: {
    params?: {
      contact?: string;  // Ensure contact is a string
      name?: string;     // Add name parameter
      initials?: string; // Add initials parameter
    };
  };
  navigation: any;
}

const ChatScreen: React.FC<ChatRoomScreenProps> = ({ route, navigation }) => {
  const contact = route?.params?.contact || 'default_contact';  // Fallback to a default string
  const name = route?.params?.name || 'Unknown';               // Fallback to 'Unknown'
  const initials = route?.params?.initials || 'U';             // Fallback to 'U'

  // const [messages, setMessages] = useState<IMessage[]>([]);

  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: 'Hey! How are you?',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'You',
      },
    },
    {
      _id: 2,
      text: 'Hello Developer! Wassup?',
      createdAt: new Date(),
      user: {
        _id: 1,
        name,
      },
    },
  ]);

  const [showModal, setShowModal] = useState(false);  // Modal state

  const [selectedMessage, setSelectedMessage] = useState<IMessage | null>(null);
  const [showOptionsModal, setShowOptionsModal] = useState(false);


  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const storedMessages = await AsyncStorage.getItem(contact);
        if (storedMessages) {
          setMessages(JSON.parse(storedMessages));
        }
      } catch (error) {
        console.log('Error fetching messages: ', error);
      }
    };
    fetchMessages();
  }, [contact]);

  const onSend = async (newMessages: IMessage[] = []) => {
    const updatedMessages = GiftedChat.append(messages, newMessages);
    setMessages(updatedMessages);

    try {
      await AsyncStorage.setItem(contact, JSON.stringify(updatedMessages));
    } catch (error) {
      console.log('Error saving messages: ', error);
    }
  };

  const deleteChat = async () => {
    try {
      await AsyncStorage.removeItem(contact);  // Remove chat from AsyncStorage
      navigation.goBack();  // Go back to the previous screen
    } catch (error) {
      console.log('Error deleting chat: ', error);
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      "Delete Chat",
      "Are you sure you want to delete this chat?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: deleteChat, style: "destructive" }
      ]
    );
  };


  const handleDeleteMessage = async (messageId: number) => {
    const updatedMessages = messages.filter(message => message._id !== messageId);
    setMessages(updatedMessages);

    try {
      await AsyncStorage.setItem(contact, JSON.stringify(updatedMessages));
    } catch (error) {
      console.log('Error deleting message: ', error);
    }
  };

  const openOptionsModal = (message: IMessage) => {
    setSelectedMessage(message);
    setShowOptionsModal(true);
  };


  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={Icons.back} style={styles.backIcon} />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <View style={styles.profileCircle}>
              <Text style={styles.profileInitials}>{initials}</Text>
            </View>
            <View style={styles.headerDetails}>
              <Text style={styles.headerTitle} numberOfLines={1}>
                {name}
              </Text>
              <Text style={styles.status}>Clocked In</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => setShowModal(true)}>
            <Image source={Icons.more} style={styles.moreIcon} />
          </TouchableOpacity>
        </View>

        {/* GiftedChat */}
        <GiftedChat
          messages={messages}
          onSend={(newMessages) => onSend(newMessages)}
          user={{
            _id: 2,
            name: 'You',
          }}
          onLongPress={(context, message) => openOptionsModal(message)}
        />

        {/* Modal for more options */}
        <Modal
          transparent
          visible={showModal}
          animationType="slide"
          onRequestClose={() => setShowModal(false)}
        >
          <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
            <View style={styles.modalBackground}>
              <View style={styles.modalContent}>
                <TouchableOpacity style={styles.modalOption}>
                  <Image source={Icons.viewDetails} style={styles.modalIcon} />
                  <Text style={styles.modalText}>View details</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalOption}>
                  <Image source={Icons.pinChat} style={styles.modalIcon} />
                  <Text style={styles.modalText}>Pin chat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalOption}>
                  <Image source={Icons.searchChat} style={styles.modalIcon} />
                  <Text style={styles.modalText}>Search chat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalOption} onPress={confirmDelete}>
                  <Image source={Icons.deleteChat} style={styles.modalIcon} />
                  <Text style={[styles.modalText, { color: 'red' }]}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>



        {/* Message Options Modal */}
        {selectedMessage && (
          <MessageOptionsModal
            visible={showOptionsModal}
            onClose={() => setShowOptionsModal(false)}
            onDelete={() => handleDeleteMessage(selectedMessage._id)}
            message={selectedMessage}
            setMessages={setMessages}
            messages={messages}
          />

        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: '#F8F9F9',
  },
  container: {
    flex: 1,
    backgroundColor: '#e7edf3',
  },
  header: {
    backgroundColor: '#F8F9F9',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    elevation: 2,
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
  },
  backIcon: {
    height: 40,
    width: 40,
    marginRight: 10,
    marginBottom: 10,
  },
  profileCircle: {
    backgroundColor: '#B0343C',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
  profileInitials: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerDetails: {
    flexDirection: 'column',
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A4A4A',
    width: 180,
  },
  status: {
    fontSize: 14,
    color: '#AAB4BE',
  },
  moreIcon: {
    height: 40,
    width: 40,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  modalIcon: {
    height: 24,
    width: 24,
    marginRight: 16,
  },
  modalText: {
    fontSize: 16,
    color: '#4A4A4A',
  },
});

export default ChatScreen;




