import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GiftedChat, IMessage, InputToolbar, Send, Bubble } from 'react-native-gifted-chat';  
import { Icons } from '../../assets';
import { useRoute } from '@react-navigation/native';
import MessageOptionsModal from '../../components/messageOptions';

interface ChatRoomScreenProps {
  route: {
    params?: {
      contact?: string;
      name?: string;
      initials?: string;
    };
  };
  navigation: any;
}

const ChatScreen: React.FC<ChatRoomScreenProps> = ({ route, navigation }) => {
  const contact = route?.params?.contact || 'default_contact';
  const name = route?.params?.name || 'Unknown';
  const initials = route?.params?.initials || 'U';

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

  const [showModal, setShowModal] = useState(false);

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
      const lastMessage = newMessages[0];
      const updatedChatInfo = {
        lastMessage: lastMessage.text,
        lastMessageTime: new Date().toISOString(),
      };
      await AsyncStorage.setItem(contact, JSON.stringify(updatedMessages));
      await AsyncStorage.setItem(`${contact}_info`, JSON.stringify(updatedChatInfo));
    } catch (error) {
      console.log('Error saving messages: ', error);
    }
  };

  const deleteChat = async () => {
    try {
      await AsyncStorage.removeItem(contact);
      navigation.goBack();
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

  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.inputToolbar}
        renderActions={() => (
          <TouchableOpacity onPress={() => { }}>
            <Image source={Icons.plus} style={styles.plusIcon} />
          </TouchableOpacity>
        )}
        placeholder="Your typed message"
        textInputStyle={styles.textInput}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={styles.sendButtonContainer}>
          <Image source={Icons.send} style={styles.sendIcon} />
        </View>
      </Send>
    );
  };


  const renderBubble = (props: any) => {
    const messageReactions = props.currentMessage.reactions || [];

    return (
      <View>
        <Bubble
          {...props}
          wrapperStyle={{
            right: { backgroundColor: '#007AFF' },
            left: { backgroundColor: '#E5E5EA' },
          }}
        />
        {messageReactions.length > 0 && (
          <View style={styles.reactionsContainer}>
            {messageReactions.map((reaction: string, index: number) => (
              <Text key={index} style={styles.reactionText}>{reaction}</Text>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.container}>
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

        <GiftedChat
          messages={messages}
          onSend={(newMessages) => onSend(newMessages)}
          user={{
            _id: 2,
            name: 'You',
          }}
          renderBubble={renderBubble}
          onLongPress={(context, message) => openOptionsModal(message)}
          renderInputToolbar={renderInputToolbar}
          renderSend={renderSend}
        />

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
  inputToolbar: {
    borderTopColor: '#E5E5E5',
    borderTopWidth: 1,
  },
  plusIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
    marginBottom: 8,
  },
  sendIcon: {
    width: 24,
    height: 24,
  },
  sendButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  textInput: {
    color: '#4A4A4A',
    fontSize: 16,
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
  reactionsContainer: {
    flexDirection: 'row',
    marginTop: 5,
    paddingHorizontal: 10,
  },
  reactionText: {
    fontSize: 18,
    marginRight: 8,
  },
});

export default ChatScreen;
