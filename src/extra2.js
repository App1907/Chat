import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { Icons } from '../../assets';
import MessageOptionsModal from '../../components/messageOptions'; // Import the new component

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

  const [messages, setMessages] = useState<IMessage[]>([
    {
      _id: 1,
      text: 'Hey! How are you?',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'You',
      },
      reactions: ['👍'], // Add a reactions field
    },
    {
      _id: 2,
      text: 'Hello Developer! Wassup?',
      createdAt: new Date(),
      user: {
        _id: 1,
        name,
      },
      reactions: [],
    },
  ]);

  const [selectedMessage, setSelectedMessage] = useState<IMessage | null>(null); // State for selected message
  const [showOptionsModal, setShowOptionsModal] = useState(false); // State for message options modal

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

  const handleDeleteMessage = async (messageId: number) => {
    const updatedMessages = messages.filter((message) => message._id !== messageId);
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

  // Render reactions under the message text
  const renderMessage = (messageProps) => {
    const { currentMessage } = messageProps;
    return (
      <View>
        <Text>{currentMessage.text}</Text>
        {currentMessage.reactions && currentMessage.reactions.length > 0 && (
          <View style={styles.reactionContainer}>
            {currentMessage.reactions.map((reaction, index) => (
              <Text key={index} style={styles.reactionText}>
                {reaction}
              </Text>
            ))}
          </View>
        )}
      </View>
    );
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
        </View>

        {/* GiftedChat */}
        <GiftedChat
          messages={messages}
          onSend={(newMessages) => onSend(newMessages)}
          user={{
            _id: 2,
            name: 'You',
          }}
          onLongPress={(context, message) => openOptionsModal(message)} // Open modal on long press
          renderMessage={renderMessage} // Render custom message with reactions
        />

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
  },
  profileCircle: {
    backgroundColor: '#B0343C',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
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
  reactionContainer: {
    flexDirection: 'row',
    paddingTop: 5,
  },
  reactionText: {
    fontSize: 24,
    marginRight: 5,
  },
});

export default ChatScreen;
