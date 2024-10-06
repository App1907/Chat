import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image} from 'react-native';
import { SCREEN_HEIGHT,SCREEN_WIDTH } from '../utils/dimension';
import { Icons } from '../assets';
import { ScreenNames } from '../navigator/screenNames';
const ChatModal = ({ modalVisible, setModalVisible, navigation }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalView}>
        <View style={styles.optioncontainer}>
            
            <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
            navigation.navigate(ScreenNames.NewChatScreen);
          }}
        >
            <View style={styles.option}>
                <Image source={Icons.newchat} style={styles.img}/>
          <Text style={styles.text}>New Chat</Text>

          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
            navigation.navigate('NewChat');
          }}
        >
            <View style={styles.option}>
                <Image source={Icons.newgroup} style={styles.img}/>
          <Text style={styles.text}>New Group Chat</Text>

          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
            navigation.navigate('NewChat');
          }}
        >
            <View style={styles.option}>
                <Image source={Icons.announcement} style={styles.img}/>
          <Text style={styles.text}>New Announcement</Text>

          </View>
        </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ChatModal;

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
    
  },
  optioncontainer:
  {
    height:SCREEN_HEIGHT-580,
    width:SCREEN_WIDTH,
    position:'absolute',
    backgroundColor: '#fff',
    borderTopRightRadius:20,
    borderTopLeftRadius:20,
    justifyContent:'flex-end'
    
  },
  option:
  {
    flexDirection:'row',
    padding:20,
    height:60,
    borderColor:"#e8ebe9",
    borderWidth:1,
    marginBottom:20,
  },
  modalOption: {
    fontSize: 18,
    
    backgroundColor: '#fff',
    borderWidth:1,
    borderColor:"#e8ebe9",
    textAlign: 'center',
    height:40,
  },
  img:{
    height:30,
    width:30,
  },
  text:
  {
    fontSize:18,
    marginLeft:10,
  }
});