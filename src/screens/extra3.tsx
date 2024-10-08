import React, { useState, useEffect } from 'react';
import { GiftedChat, IMessage, Bubble } from 'react-native-gifted-chat';
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../utils/diemention';
import { Icons } from '../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatOptionsModal from '../component/chatoptionmodal';
import ReactionModal from '../component/reactionmodal';

// Extend IMessage to include metadata
interface CustomMessage extends IMessage {
  metadata?: {
    reaction?: string;
  };
}

interface ChatRoomScreenProps {
  route: {
    params?: {
      contact?: string; 
    };
  };
  navigation: any;
  onNewChat: (contact: string) => void;
}

const getInitials = (name: string) => {
  return name.split(' ').map((n) => n[0]).join('');
};

const getRandomColor = () => {
  const colors = ['#FFB6C1', '#8A2BE2', '#5F9EA0', '#FF6347', '#FFD700', '#40E0D0'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const ChatRoomScreen: React.FC<ChatRoomScreenProps> = ({ route, navigation, onNewChat }) => {
  const contact = route?.params?.contact || "default_contact";
  const [messages, setMessages] = useState<CustomMessage[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [reactionModalVisible, setReactionModalVisible] = useState<boolean>(false);
  const [selectedMessage, setSelectedMessage] = useState<CustomMessage | null>(null);
  const [initialColor] = useState<string>(getRandomColor());

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const storedMessages = await AsyncStorage.getItem(contact);
        if (storedMessages) {
          setMessages(JSON.parse(storedMessages));
        } else {
          setMessages([
            {
              _id: 2,
              text: 'Hii, How are you??',
              createdAt: new Date(),
              user: {
                _id: 2,
                name: contact,
              },
            } as CustomMessage,
          ]);
        }
      } catch (error) {
        console.log('Error fetching messages: ', error);
      }
    };
    fetchMessages();
  }, [contact]);

  const onSend = async (newMessages: CustomMessage[] = []) => {
    const updatedMessages = GiftedChat.append(messages, newMessages);
    setMessages(updatedMessages);

    try {
      await AsyncStorage.setItem(contact, JSON.stringify(updatedMessages));
      onNewChat(contact); // Notify ChatScreen
    } catch (error) {
      console.log('Error saving messages: ', error);
    }
  };

  const onMessageLongPress = (context: any, message: CustomMessage) => {
    setSelectedMessage(message);
    setReactionModalVisible(true);
  };

  const onReactionSelect = (reaction: string) => {
    if (selectedMessage) {
      const updatedMessages = messages.map((msg) => {
        if (msg._id === selectedMessage._id) {
          return {
            ...msg,
            metadata: {
              ...msg.metadata,
              reaction,
            },
          };
        }
        return msg;
      });
      setMessages(updatedMessages);
      setReactionModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.iconcontainer}>
              <Image source={Icons.backicon2} style={styles.Icon} />
            </View>
          </TouchableOpacity>

          <View style={[styles.initialsCircle, { backgroundColor: initialColor }]}>
            <Text style={styles.initialsText}>{getInitials(contact)}</Text>
          </View>

          <Text style={styles.contactName}>{contact}</Text>

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={[styles.iconcontainer, { marginLeft: SCREEN_WIDTH * 0.24173027989 }]}>
              <Image source={Icons.dot} style={styles.Icon} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: 1,
        }}
        onLongPress={onMessageLongPress}
        renderBubble={(props) => (
          <Bubble
            {...props}
            wrapperStyle={{
              left: {
                backgroundColor: '#F0F0F0',
                borderRadius: 15,
                padding: 5,
              },
              right: {
                backgroundColor: '#007AFF',
                borderRadius: 15,
                padding: 5,
              },
            }}
            textStyle={{
              left: {
                color: '#000',
                fontSize: 16,
              },
              right: {
                color: '#fff',
                fontSize: 16,
              },
            }}
          />
        )}
        renderMessageText={(props) => {
          const reaction = (props.currentMessage as CustomMessage).metadata?.reaction;
          return (
            <View>
              <Text>{props.currentMessage.text}</Text>
              {reaction && (
                <Text style={styles.reactionText}>{reaction}</Text>
              )}
            </View>
          );
        }}
      />

      {selectedMessage && (
        <ReactionModal
          visible={reactionModalVisible}
          message={selectedMessage.text}
          onClose={() => setReactionModalVisible(false)}
          onReactionSelect={onReactionSelect}
        />
      )}

      <ChatOptionsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

export default ChatRoomScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
  },
  header: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.14436619718,
    backgroundColor: "#F8F9F9",
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SCREEN_HEIGHT * 0.07394366197,
    paddingHorizontal: SCREEN_WIDTH * 0.04071246819,
    width: SCREEN_WIDTH,
  },
  iconcontainer: {
    height: 40,
    width: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  initialsCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  initialsText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactName: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: '600',
    color: '#3A4F5F',
  },
  reactionText: {
    marginTop: 5,
    fontSize: 16,
    color: '#FF6347',
  },
});
