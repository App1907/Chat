import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GiftedChat, IMessage, InputToolbar, Send, Bubble } from 'react-native-gifted-chat';
import { Icons } from '../../assets';
import { useRoute } from '@react-navigation/native';
import MessageOptionsModal from '../../components/messageOptions';
import styles from './styles';
import strings from '../../utils/strings';

interface CustomMessage extends IMessage {
  emoji?: string;
}

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
        // name,
      },
    },
  ]);

  // const [messages, setMessages] = useState<IMessage[]>([]);
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
      strings.delete_chat,
      'Are you sure you want to delete this chat?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: deleteChat, style: 'destructive' },
      ]
    );
  };



  const handleDeleteMessage = async (messageId: number) => {

    const updatedMessages = messages.filter((message) => message._id !== messageId);
  

    setMessages(updatedMessages);
  

    const lastMessage = updatedMessages.length > 0 ? updatedMessages[0] : null;
    const updatedChatInfo = {
      lastMessage: lastMessage ? lastMessage.text : '',
      lastMessageTime: lastMessage ? new Date(lastMessage.createdAt).toISOString() : '',
    };
  
    try {

      await AsyncStorage.setItem(contact, JSON.stringify(updatedMessages));
      await AsyncStorage.setItem(`${contact}_info`, JSON.stringify(updatedChatInfo));
    } catch (error) {
      console.log('Error deleting message: ', error);
    }
  };


  

  const openOptionsModal = (message: IMessage) => {
    setSelectedMessage(message);
    setShowOptionsModal(true);
  };

  const renderInputToolbar = (props: any) => (
    <InputToolbar
      {...props}
      containerStyle={styles.inputToolbar}
      renderActions={() => (
        <TouchableOpacity onPress={() => {}}>
          <Image source={Icons.plus} style={styles.plusIcon} />
        </TouchableOpacity>
      )}
      placeholder="Your typed message"
      textInputStyle={styles.textInput}
    />
  );

  const renderSend = (props: any) => (
    <Send {...props}>
      <View style={styles.sendButtonContainer}>
        <Image source={Icons.send} style={styles.sendIcon} />
      </View>
    </Send>
  );

  const handleEmojiSelect = async (emoji: string) => {
    if (selectedMessage) {
      const updatedMessages = messages.map((msg) => {
        if (msg._id === selectedMessage._id) {
          return { ...msg, emoji };
        }
        return msg;
      });
      setMessages(updatedMessages);

      try {
        await AsyncStorage.setItem(contact, JSON.stringify(updatedMessages));
      } catch (error) {
        console.log('Error saving messages with emoji: ', error);
      }
    }
    setShowOptionsModal(false);
  };

  const renderBubble = (props: { currentMessage: CustomMessage }) => (
    <View style={{ marginTop: 20 }}>
      <Bubble
        {...props}
        wrapperStyle={{
          left: { marginLeft: -30 },
        }}
      />
      {props.currentMessage.reactions && (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 5, position: 'relative' }}>
          {props.currentMessage.reactions.map((emoji: any, index: number) => (
            <View
              style={{
                top: -65,
                right: 45,
                position: 'absolute',
                backgroundColor: 'grey',
                borderRadius: 15,
              }}
              key={index}
            >
              <Text style={{ fontSize: 20 }}>{emoji}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );

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
          user={{ _id: 2, name: 'You' }}
          renderBubble={renderBubble}
          onLongPress={(context, message) => openOptionsModal(message)}
          renderInputToolbar={renderInputToolbar}
          renderSend={renderSend}
        />

        <Modal transparent visible={showModal} animationType="slide" onRequestClose={() => setShowModal(false)}>
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
            onEmojiSelect={handleEmojiSelect}
            contact={contact}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
