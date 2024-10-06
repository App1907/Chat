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

// Helper function to get initials from names
const getInitials = (firstName: string, lastName: string) => {
  return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
};

// Function to render individual chat items
const renderItem = ({ item }: any, navigation: any) => (
  <TouchableOpacity
    onPress={() =>
      navigation.navigate('ChatScreen', {
        name: `${item.firstName} ${item.lastName}`,
        initials: getInitials(item.firstName, item.lastName),
        contact: `${item.firstName}_${item.lastName}`, // Use the first and last name as the contact key
      })
    }
  >
    <View style={styles.resultItem}>
      <View style={styles.profileCircle}>
        <Text style={styles.profileInitials}>
          {getInitials(item.firstName, item.lastName)}
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
    </View>
  </TouchableOpacity>
);

// Main MessageScreen component
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
          // Construct the key using firstName and lastName
          const key = `${contact.firstName}_${contact.lastName}`;
          const messages = await AsyncStorage.getItem(key);  // Use key instead of contact.name
          return { 
            ...contact, 
            messages: messages ? JSON.parse(messages) : [] 
          };
        });

        const chatResults = await Promise.all(chatPromises);
        const existingChats = chatResults.filter(chat => chat.messages.length > 0);
        setChats(existingChats);
      } catch (error) {
        console.error('Error fetching chats from AsyncStorage:', error);
      }
    };

    fetchChats();
  }, [chats]);

  return (
    <View style={styles.container}>
      <Header setShowModal={setShowModal} />
      <SearchBar />
      <View style={styles.noChatContainer}>
        {chats.length === 0 ? (
          <>
            <Image source={Images.nochat} style={styles.noChatIcon} />
            <Text style={styles.noChatText}>No chats, yet!</Text>
            <TouchableOpacity style={styles.startChatButton} onPress={start}>
              <Text style={styles.startChatButtonText}>Start Chat</Text>
            </TouchableOpacity>
          </>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={chats}
            renderItem={({ item }) => renderItem({ item }, navigation)}
            keyExtractor={(item) => `${getInitials(item.firstName, item.lastName)}_${item.firstName}_${item.lastName}`}

            // keyExtractor={(item) => `${item.firstName}_${item.lastName}`}
          />
        )}
      </View>

      {/* Modal for Start Chat Options */}
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

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7edf3',
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
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  profileCircle: {
    backgroundColor: '#2A7BBB',
    borderRadius: 25,
    width: 50,
    height: 50,
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


  resultFullName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },

  
  resultName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultPhoneNumber: {
    fontSize: 14,
    color: '#AAB4BE',
  },
});

export default MessageScreen;
