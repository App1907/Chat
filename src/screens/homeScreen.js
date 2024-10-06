import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView, Modal, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SecureAccountModal from '../components/secureAccount';
import BottomStack from '../navigator/bottomTab';


const windowWidth = Dimensions.get('screen').width;

const HomeScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);


  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('isLogin');
      navigation.reset({
        index: 0,
        routes: [{ name: 'SignInScreen' }],
      });

    } catch (error) {
      console.log(error);
    }
  };

  const [benefits] = useState([
    { id: '1', title: 'Create\nCompaign', img: require('../assets/icons/calendar.png') },
    { id: '2', title: 'One Time\nTrigger', img: require('../assets/icons/calendar.png') },
    { id: '3', title: 'Create\nCompaign', img: require('../assets/icons/calendar.png') },
    { id: '4', title: 'One Time\nTrigger', img: require('../assets/icons/calendar.png') },
  ]);

  const [data] = useState([
    {
      id: 1,
      img: require('../assets/icons/contact.png'),
      title1: 'Successfully configured POS for sites',
      title2: 'Jun 3, 2023 | 12:30 PM',
    },
    {
      id: 2,
      img: require('../assets/icons/contact.png'),
      title1: 'You ended the campaign Holiday \nSpecial',
      title2: 'Jun 3, 2023 | 12:30 PM',
    },
    {
      id: 3,
      img: require('../assets/icons/contact.png'),
      title1: 'Created a campaign Holiday Special',
      title2: 'Jun 3, 2023 | 12:30 PM',
    },
    { id: 4, img: require('../assets/icons/contact.png'), title1: 'Activated the user access group named \nSite manager', title2: 'Jun 3, 2023 | 12:30 PM' },
    { id: 5, img: require('../assets/icons/contact.png'), title1: 'Added a discount code to a campaign \nnamed Holiday Special', title2: 'Jun 3, 2023 | 12:30 PM' },
    { id: 6, img: require('../assets/icons/contact.png'), title1: 'Added a new customer C02039', title2: 'Jun 3, 2023 | 12:30 PM' },
    { id: 7, img: require('../assets/icons/contact.png'), title1: 'Activated the user access group named \nSite Managers', title2: 'Jun 3, 2023 | 12:30 PM' },
    { id: 8, img: require('../assets/icons/contact.png'), title1: 'Successfully configured POS for sites', title2: 'Jun 3, 2023 | 12:30 PM' },
    { id: 9, img: require('../assets/icons/contact.png'), title1: 'Successfully configured POS for sites', title2: 'Jun 3, 2023 | 12:30 PM' },
    { id: 10, img: require('../assets/icons/contact.png'), title1: 'Successfully configured POS for sites', title2: 'Jun 3, 2023 | 12:30 PM' },

  ]);


  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    navigation.navigate('AddPhoneNumberScreen');
  };

  const seperate = () => {
    return (
      <View
        style={{
          borderBottomWidth: 1,
          marginHorizontal: 16,
          borderColor: 'lightgrey',
        }}
      />
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.unload}>
      <View style={styles.imgView}>
        <Image source={item.img} style={styles.imgIcon} />
      </View>
      <Text style={styles.frequentText}>{item.title}</Text>
    </View>
  );

  const renderItemVertical = ({ item }) => (
    <View style={styles.unloadVertical}>
      <View style={styles.imgViewVertical}>
        <Image source={item.img} style={styles.imgIconVertical} />
      </View>
      <View>
        <Text style={styles.frequentTextV1}>{item.title1}</Text>
        <Text style={styles.frequentTextV2}>{item.title2}</Text>
      </View>
    </View>
  );


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header1}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.userName}>Kevin</Text>
        </View>
        <View style={styles.headerIcons}>
          <Image source={require('../assets/icons/chat.png')} style={styles.headerIconImage} />
          <TouchableOpacity style={styles.footerItem} onPress={logOut}>
            <Image source={require('../assets/icons/notification.png')} style={styles.headerIconImage} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <TouchableOpacity style={styles.accountSetupCard} onPress={openModal}>
          <Image source={require('../assets/icons/gear.png')} style={styles.accountSetupImage} />
          <View style={styles.accountSetupText}>
            <Text style={styles.accountSetupTitle}>Complete your account setup</Text>
            <Text style={styles.accountSetupSubtitle}>Tap to continue</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.frequently}>FREQUENTLY USED</Text>
        <View style={styles.flatCont}>
          <FlatList
            bounces={false}
            horizontal
            data={benefits}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.recent}>
          <Text style={styles.recent1}>RECENT ACTIVITIES</Text>
          <TouchableOpacity>
            <Text style={styles.recent2}>All Product ▼</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.secondBoxCont}>
          <FlatList
            bounces={false}
            data={data}
            renderItem={renderItemVertical}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={seperate}
          />
        </View>
      </ScrollView>


      <SecureAccountModal
        visible={modalVisible}
        closeModal={closeModal} />
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#e7edf3',
  },
  header: {
    //width: 413,
    height: 125,
    backgroundColor: '#2A7BBB',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header1: {
    marginTop: 30,
    marginLeft: 10,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#fff',
    fontFamily:'Montserrat',
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    fontFamily:'Montserrat',
  },
  headerIcons: {
    flexDirection: 'row',
    marginTop: 30,
    borderRadius: 8,
    backgroundColor: '#2A7BBB',
  },
  headerIconImage: {
    width: 25,
    height: 25,
    marginLeft: 15,
  },
  accountSetupCard: {
    backgroundColor: '#e7f1ff',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountSetupImage: {
    width: 30,
    height: 30,
  },
  accountSetupText: {
    marginLeft: 10,
  },
  accountSetupTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#164061',
  },
  accountSetupSubtitle: {
    fontSize: 13,
    marginTop: 5,
    fontWeight: '500',
    color: '#60707D',
  },
  sectionTitle: {
    marginLeft: 20,
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  frequentlyUsedList: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  frequentlyUsedItem: {
    backgroundColor: '#FFFFFF',
    width: 108,
    height: 108,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 15,
  },
  frequentlyUsedImage: {
    width: 30,
    height: 30,
  },
  frequentlyUsedText: {
    marginTop: 10,
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  activityList: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  activityItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  userCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInitial: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  activityContent: {
    marginLeft: 15,
    flex: 1,
  },
  activityMessage: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  activitySubMessage: {
    color: '#666',
  },
  activityTime: {
    position: 'absolute',
    right: 0,
    top: 0,
    color: '#999',
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#f2f6fb',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalImage: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#164061',
  },
  modalDescription: {
    textAlign: 'center',
    color: '#60707D',
    marginVertical: 10,
    fontSize: 15,
  },
  stepsContainer: {
    marginVertical: 20,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  stepIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  stepText: {
    fontSize: 16,
    color: '#164061',
  },
  getStartedButton: {
    backgroundColor: '#2A7BBB',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  getStartedButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },



  upper: {
    backgroundColor: '#2A7BBB',
    height: windowWidth > 400 ? 123 : 100,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  sub: {
    flexDirection: 'row',
  },
  topTextCont: {
    marginLeft: 24,
    marginBottom: 15,
  },
  welcome: {
    color: 'white',
    fontSize: 18,
  },
  Kevin: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  topImagecont: {
    flexDirection: 'row',
    marginRight: 12,
  },
  topimgbox: {
    backgroundColor: 'rgba(217, 217, 217, 0.1)',
    height: windowWidth > 400 ? 45 : 40,
    width: windowWidth > 400 ? 45 : 40,
    borderRadius: 8,
    marginLeft: 8,
    marginBottom: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  setupCont: {
    marginHorizontal: 16,
    marginTop: 24,
    borderRadius: 8,
    flexDirection: 'row',
    backgroundColor: '#d9e2ee',
    padding: 20,
  },
  head: {
    fontWeight: '700',
    fontSize: 15,
    color: '#164061',
  },
  descr: {
    fontWeight: '500',
    fontSize: 13,
    color: '#60707D',
  },
  setupimgBox: {
    marginRight: 16,
  },
  frequently: {
    marginLeft: 16,
    marginTop: 32,
    color: '#525454',
    fontSize: 12,
    fontWeight: '600',
  },
  flatCont: {
    marginVertical: 16,
  },
  imgView: {
    backgroundColor: '#46A4BA',
    height: 40,
    width: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  imgViewVertical: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    height: 40,
    width: 40,
  },
  imgIcon: {
    height: 40,
    width: 40,
  },
  imgIconVertical: {
    height: 40,
    width: 40,
  },
  recent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginVertical: 16,
  },
  recent1: {
    color: '#525454',
    fontWeight: '600',
    fontSize: 12,
  },
  recent2: {
    color: '#23679D',
    fontSize: 13,
    fontWeight: '600',
  },
  frequentTextV1: {
    color: '#0E1F2C',
    fontWeight: '600',
  },
  frequentTextV2: {
    marginTop: 8,
    color: '#85929C',
    fontSize: 12,
    fontWeight: '500',
  },
  unload: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginLeft: 16,
    backgroundColor: '#F8F9F9',
    flexDirection: 'row',
    padding: 12,
    paddingRight: 16,
    alignItems: 'center',
  },
  unloadVertical: {
    backgroundColor: '#F8F9F9',
    flexDirection: 'row',
    padding: 18,
  },
  secondBoxCont: {
    marginHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F8F9F9',
  },
  navBottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 5,
    borderTopWidth: 1,
    borderColor: 'lightgrey',
  },
  navText: {
    fontWeight: '500',
    color: '#8A91A5',
    marginBottom: 12,
  },
  bottomIcon: {
    height: 22,
    width: 22,
    alignSelf: 'center',
    marginBottom: 10,
  },
});

export default HomeScreen;
