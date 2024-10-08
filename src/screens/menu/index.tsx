import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  SafeAreaView,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jsonData from '../../assets/data.json';
import Header from '../../components/header';
import SearchBar from '../../components/searchBar';
import { Icons, Images } from '../../assets';
import { useIsFocused } from '@react-navigation/native';
import styles from './styles';

const getInitials = (firstName: string, lastName: string) => {
  return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
};

const formatTime = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const renderItem = ({ item }: any, navigation: any) => (
  <TouchableOpacity
    onPress={() =>
      navigation.navigate('ChatScreen', {
        name: `${item.firstName} ${item.lastName}`,
        initials: getInitials(item.firstName, item.lastName),
        contact: `${item.firstName}_${item.lastName}`,
      })
    }
  >
    <View style={styles.resultItem}>
      <View style={styles.profileCircle}>
        <Text style={styles.profileInitials}>
          {`${item.firstName.charAt(0)}${item.lastName.charAt(0)}`}
        </Text>
      </View>
      <View style={styles.resultInfo}>
        <Text style={styles.resultName}>
          {item.firstName} {item.lastName}
        </Text>
        <Text style={styles.resultPhoneNumber}>
          {item.lastMessage ? `You: ${item.lastMessage}` : 'Start a new chat'}
        </Text>
      </View>
      <View>
        <Text style={styles.timeText}>
          {item.lastMessageTime
            ? formatTime(item.lastMessageTime)
            : ''}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

const MessageScreen = ({ navigation }: { navigation: any }) => {
  const [showModal, setShowModal] = useState(false);
  const [chats, setChats] = useState([]);
  const isFocused = useIsFocused();

  const start = () => {
    setShowModal(!showModal);
  };

  const newChat = () => {
    navigation.navigate('NewScreen');
    setShowModal(false);
  };

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const chatPromises = jsonData.users.map(async (contact) => {
          const key = `${contact.firstName}_${contact.lastName}`;
          const messages = await AsyncStorage.getItem(key);
          const chatInfo = await AsyncStorage.getItem(`${key}_info`);
          
          let parsedMessages = messages ? JSON.parse(messages) : [];
          let parsedChatInfo = chatInfo ? JSON.parse(chatInfo) : {};

          if (parsedMessages.length > 50) {
            parsedMessages = parsedMessages.slice(-50);
          }

          return { ...contact, ...parsedChatInfo, messages: parsedMessages };
        });

        const chatResults = await Promise.all(chatPromises);
        const existingChats = chatResults.filter((chat) => chat.messages.length > 0);
        setChats(existingChats);
      } catch (error) {
        console.error('Error fetching chats from AsyncStorage:', error);
      }
    };

    fetchChats();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Header setShowModal={setShowModal} />
      <SearchBar />
      <View style={styles.chatListContainer}>
        {chats.length === 0 ? (
          <>
            <View style={styles.noChatContainer}>
              <Image source={Images.nochat} style={styles.noChatIcon} />
              <Text style={styles.noChatText}>No chats, yet!</Text>
              <TouchableOpacity style={styles.startChatButton} onPress={start}>
                <Text style={styles.startChatButtonText}>Start Chat</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={chats}
            renderItem={({ item }) => renderItem({ item }, navigation)}
            keyExtractor={(item) => `${item.firstName}_${item.lastName}`}
          />
        )}
      </View>

      <Modal visible={showModal} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={start}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.modalOption} onPress={newChat}>
                <Image source={Icons.newChat} style={styles.modalIcon} />
                <Text style={styles.modalText}>New Chat</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalOption}>
                <Image source={Icons.groupChat} style={styles.modalIcon} />
                <Text style={styles.modalText}>New Group Chat</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalOption}>
                <Image source={Icons.announcement} style={styles.modalIcon} />
                <Text style={styles.modalText}>New Announcement</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};


export default MessageScreen;
