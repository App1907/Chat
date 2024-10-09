import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Image, Text, TextInput} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {vh, vw} from '../../utils/dimension';
import {Images} from '../../assets';
import CustomModal from '../../components/CustomeModal';
import {dotModalData, Messagemodaldata} from '../../data/ModalData';
import styles from './style';
import ConfirmationModal from '../../components/modalComp';
import {ScreenNames} from '../../navigator/screensName';
import {emojis} from '../../data/ModalData';

interface CustomMessage extends IMessage {
  emoji?: string;
}

const Chat = ({
  route,
}: {
  route: {
    params: {
      userId: string;
      initials: string;
      firstname: string;
      lastname: string;
    };
  };
}) => {
  type RootStackType = {
    Home: string;
  };
  const {userId, initials, lastname, firstname} = route.params;
  const [messages, setMessages] = useState<CustomMessage[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [dotModal, setDotModal] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');
  const [messageToDelete, setMessageToDelete] = useState<
    string | number | null
  >(null);
  const [modalId, setModalId] = useState<number>(0);
  const [confirmModalVisible, setConfirmModalVisible] =
    useState<boolean>(false);

  const navigation = useNavigation<NavigationProp<RootStackType>>();

  useEffect(() => {
    fetchMessages();
  }, [userId]);

  const fetchMessages = async () => {
    try {
      const storedMessages = await AsyncStorage.getItem(${userId});
      if (storedMessages) {
        const parsedMessages = JSON.parse(storedMessages);
        setMessages(parsedMessages);
      } else {
        const initialMessages = [
          {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
        ];
        setMessages(initialMessages);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    if (messageToDelete) {
      const updatedMessages = messages.map(msg => {
        if (msg._id === messageToDelete) {
          return {
            ...msg,
            emoji: emoji,
          };
        }
        return msg;
      });
      setMessages(updatedMessages);
      AsyncStorage.setItem(${userId}, JSON.stringify(updatedMessages));
    }
    closeModal();
  };

  const toggleDotModal = () => {
    setModalId(2);
    setDotModal(!dotModal);
  };

  const closeDotModal = () => {
    setModalId(2);
    setDotModal(false);
  };

  const toggleModal = () => {
    setModalId(1);
    setVisible(!visible);
  };

  const closeModal = () => {
    setModalId(1);
    setVisible(false);
  };

  const toggleDeleteModal = () => {
    setConfirmModalVisible(!confirmModalVisible);
  };

  const deleteMsg = async () => {
    if (messageToDelete === null) return;

    const updatedMessages = messages.filter(
      (msg: {_id: string | number}) => msg._id !== messageToDelete,
    );
    setMessages(updatedMessages);
    await AsyncStorage.setItem(${userId}, JSON.stringify(updatedMessages));
    setMessageToDelete(null);
    setConfirmModalVisible(false);
  };

  const onSend = async () => {
    if (inputText.trim().length === 0) return;

    const newMessage: IMessage = {
      _id: Math.random().toString(),
      text: inputText,
      createdAt: new Date(),
      user: {_id: 1, name: 'You'},
    };

    const updatedMessages = GiftedChat.append(messages, [newMessage]);
    setMessages(updatedMessages);
    setInputText('');
    await AsyncStorage.setItem(${userId}, JSON.stringify(updatedMessages));
  };

  const DeleteAll = async () => {
    setMessages([]);
    await AsyncStorage.setItem(${userId}, JSON.stringify([]));
    setConfirmModalVisible(false);
  };

  // const formatDate = (props:{currentMessage: CustomMessage}) => {
  //   const today = new Date();

  //   const isToday = date.getDate() === today.getDate() &&
  //                   date.getMonth() === today.getMonth() &&
  //                   date.getFullYear() === today.getFullYear();

  //   return isToday ? 'Today' : date.toLocaleDateString(); // Change to desired date format
  // };

  const renderInputToolbar = () => {
    // const { inputText, setInputText, onSend } = props;

    return (
      <View style={styles.inputContainer}>
        <View style={styles.addView}>
          <Text style={styles.addText}>+</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={onSend}
        />
        <TouchableOpacity style={styles.sendButton} onPress={onSend}>
          <Image style={styles.sendButtonImage} source={Images.send} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderBubble = (props: {currentMessage: CustomMessage}) => {
    const {currentMessage} = props;
    const isSender = currentMessage.user._id === 1;
    const createdAt = new Date(currentMessage.createdAt);
    return (
      <TouchableOpacity
        style={styles.bubbleContainer}
        onLongPress={() => {
          setVisible(true);
          setMessageToDelete(currentMessage._id);
        }}>
        <Text
          style={[
            styles.timeText,
            {
              textAlign: isSender ? 'right' : 'left',
              marginLeft: isSender ? 0 : vw(-25),
              marginRight: isSender ? vw(15) : 0,
            },
          ]}>
          {createdAt.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
        <View
          style={[
            styles.bubble,
            {
              backgroundColor: isSender ? '#2a7cbc' : 'white',
              marginLeft: isSender ? 0 : vw(-30),
              marginRight: isSender ? vw(10) : 0,
            },
          ]}>
          {currentMessage.emoji && (
            <View
              style={[
                styles.emojiContainer,
                isSender?
                {
                  bottom: vh(20),
                  left: vw(-20),
                }:
                {
                  bottom: vh(20),
                  left: vw(105),
                },
              ]}>
              <Text style={styles.selectedEmoji}>{currentMessage.emoji}</Text>
            </View>
          )}
          <Text style={{color: isSender ? 'white' : 'black'}}>
            {props.currentMessage.text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.chatTopBar}>
        <TouchableOpacity
          onPress={() => navigation.navigate(ScreenNames.menu)}
          style={styles.backContainer}>
          <Image
            style={styles.backIcon}
            resizeMode="contain"
            source={Images.whiteBack}
          />
        </TouchableOpacity>
        <View style={styles.initialsWrapper}>
          <View style={styles.initialsContainer}>
            <Text style={styles.initialsText}>{initials}</Text>
          </View>
          <View style={styles.statusIndicator} />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>
            {firstname} {lastname}
          </Text>
          <Text style={styles.clocked}>clocked In.</Text>
        </View>
        <TouchableOpacity
          style={styles.threeDot}
          onPress={() => setDotModal(true)}>
          <Image
            style={styles.backIcon}
            resizeMode="contain"
            source={Images.threeDot}
          />
        </TouchableOpacity>
      </View>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        alignTop={true}
        renderInputToolbar={renderInputToolbar}
        // renderDay={formatDate}
        renderTime={() => null}
        user={{
          _id: 1,
        }}
      />

      <CustomModal
        visible={visible}
        onRequestClose={toggleModal}
        data={Messagemodaldata}
        onPress={closeModal}
        confirmDelete={toggleDeleteModal}
        emojis={emojis}
        onEmojiSelect={handleEmojiSelect}
      />
      <CustomModal
        visible={dotModal}
        onRequestClose={toggleDotModal}
        data={dotModalData}
        onPress={closeDotModal}
        confirmDelete={toggleDeleteModal}
      />
      <ConfirmationModal
        visible={confirmModalVisible}
        image={Images.confrmDelete}
        backDropPress={toggleDeleteModal}
        onClose={modalId === 1 ? deleteMsg : DeleteAll}
        title={'Delete Message?'}
        message={'Are you sure you want to delete this message?'}
      />
    </View>
  );
};

export default Chat;