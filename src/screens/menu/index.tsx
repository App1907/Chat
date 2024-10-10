import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Contacts from 'react-native-contacts';
import jsonData from '../../assets/data.json';
import Header from '../../components/header';
import SearchBar from '../../components/searchBar';
import { Icons, Images } from '../../assets';
import { useIsFocused } from '@react-navigation/native';
import { ScreenNames } from '../../navigator/screenNames';
import strings from '../../utils/strings';
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
      navigation.navigate(ScreenNames.ChatScreen, {
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
          {item.lastMessage ? ` ${strings.you}: ${item.lastMessage}` : `${strings.start_new_chat}`}
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
  const [chats, setChats] = useState<any[]>([]);
  const [syncedChats, setSyncedChats] = useState<any[]>([]);
  const isFocused = useIsFocused();

  const start = () => {
    setShowModal(!showModal);
  };

  const newChat = () => {
    navigation.navigate(ScreenNames.NewScreen);
    setShowModal(false);
  };


  const fetchSyncedContactsChats = async () => {
    try {
      const contacts = await Contacts.getAll();
      const contactChatsPromises = contacts.map(async (contact) => {
        const key = `${contact.givenName}_${contact.familyName || 'Unknown'}`;
        const messages = await AsyncStorage.getItem(key);
        const chatInfo = await AsyncStorage.getItem(`${key}_info`);

        let parsedMessages = messages ? JSON.parse(messages) : [];
        let parsedChatInfo = chatInfo ? JSON.parse(chatInfo) : {};

        if (parsedMessages.length > 0) {
          return {
            firstName: contact.givenName,
            lastName: contact.familyName || '',
            ...parsedChatInfo,
            messages: parsedMessages,
          };
        }
        return null;
      });

      const contactChats = await Promise.all(contactChatsPromises);
      return contactChats.filter((chat) => chat !== null);
    } catch (error) {
      // console.error('Error fetching contacts with chats:', error);
      return [];
    }
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


        const syncedChats = await fetchSyncedContactsChats();


        setChats([...existingChats, ...syncedChats]);
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
          <View style={styles.noChatContainer}>
            <Image source={Images.nochat} style={styles.noChatIcon} />
            <Text style={styles.noChatText}>{strings.no_chats}</Text>
            <TouchableOpacity style={styles.startChatButton} onPress={start}>
              <Text style={styles.startChatButtonText}>{strings.start_chat}</Text>
            </TouchableOpacity>
          </View>
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
                <Text style={styles.modalText}>{strings.new_chat}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalOption}>
                <Image source={Icons.groupChat} style={styles.modalIcon} />
                <Text style={styles.modalText}>{strings.new_group_chat}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalOption}>
                <Image source={Icons.announcement} style={styles.modalIcon} />
                <Text style={styles.modalText}>{strings.new_announcement}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default MessageScreen;
