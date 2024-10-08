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



const getInitials = (firstName: string, lastName: string) => {
  return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
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
          {item.phone === '' ? 'Start a new chat' : `You: ${item.phone}`}
        </Text>
      </View>

      
      {/* <Text style={styles.resultTime}>01:48 AM</Text> */}
    </View>
  </TouchableOpacity>
);


const MessageScreen = ({ navigation }: { navigation: any }) => {
  const [showModal, setShowModal] = useState(false);
  const [chats, setChats] = useState([]);

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
          // Limit the amount of data retrieved and stored
          let parsedMessages = messages ? JSON.parse(messages) : [];
          if (parsedMessages.length > 50) {
            // Only keep the last 50 messages to prevent overflow
            parsedMessages = parsedMessages.slice(-50);
          }
          return { ...contact, messages: parsedMessages };
        });
  
        const chatResults = await Promise.all(chatPromises);
        const existingChats = chatResults.filter((chat) => chat.messages.length > 0);
        setChats(existingChats);
      } catch (error) {
        console.error('Error fetching chats from AsyncStorage:', error);
      }
    };
  
    fetchChats();
  }, []);
  

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


      <Modal visible={showModal} transparent animationType="slide">
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7edf3',
  },
  chatListContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },

  noChatContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  noChatIcon: {
    width: 166,
    height: 130,
  },
  noChatText: {
    fontSize: 16,
    color: '#7E8A9A',
    marginVertical: 20,
  },
  startChatButton: {
    backgroundColor: '#2A7BBB',
    borderRadius: 8,
    paddingHorizontal: 50,
    paddingVertical: 10,
  },
  startChatButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContent: {
    backgroundColor: 'white',
    paddingVertical: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
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
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'white',
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  profileCircle: {
    backgroundColor: '#2A7BBB',
    borderRadius: 25,
    width: 50,
    height: 50,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitials: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultInfo: {
    marginLeft: 15,
    flex: 1,
  },
  resultName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  resultPhoneNumber: {
    fontSize: 14,
    color: '#AAB4BE',
  },
  resultTime: {
    fontSize: 14,
    color: '#AAB4BE',
  },
});

export default MessageScreen;
