import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  PermissionsAndroid,
  Alert,
  Platform,
} from 'react-native';
import Contacts from 'react-native-contacts';
import { Icons, Images } from '../../assets';
import jsonData from '../../assets/data.json';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenNames } from '../../navigator/screenNames';
import strings from '../../utils/strings';
import styles from './styles';

const NewChatScreen = ({ navigation }: { navigation: any }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState<any[]>(jsonData.users);
  const [contacts, setContacts] = useState<any[]>([]); 


  const requestContactPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts Permission',
          message: 'This app needs access to your contacts to sync them.',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.warn(error);
      return false;
    }
  };


  const loadContacts = () => {
    Contacts.getAll()
      .then((contacts) => {
        setContacts(contacts);
        setFilteredData([...jsonData.users, ...contacts]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const checkPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await requestContactPermission();
        if (granted) {
          loadContacts();
        } else {
          Alert.alert('Permission Denied', 'Cannot access contacts without permission');
        }
      } else {
        Contacts.checkPermission().then((permission) => {
          if (permission === 'authorized') {
            loadContacts();
          } else {
            Contacts.requestPermission().then((permission) => {
              if (permission === 'authorized') {
                loadContacts();
              } else {
                Alert.alert('Permission Denied', 'Cannot access contacts without permission');
              }
            });
          }
        });
      }
    };

    checkPermission();
  }, []);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text === '') {
      setFilteredData([...jsonData.users, ...contacts]);
    } else {
      const jsonResults = jsonData.users.filter((item) =>
        `${item.firstName} ${item.lastName}`
          .toLowerCase()
          .includes(text.toLowerCase())
      );
      const contactResults = contacts.filter((item) =>
        `${item.givenName} ${item.familyName}`
          .toLowerCase()
          .includes(text.toLowerCase())
      );
      setFilteredData([...jsonResults, ...contactResults]);
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
  };

  const getRandomColor = () => {
    const colors = ['#FFB6C1', '#8A2BE2', '#5F9EA0', '#FF6347', '#FFD700', '#40E0D0'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const renderItem = ({ item }: any) => {

    const isFromContacts = item.givenName !== undefined;

    const firstName = isFromContacts ? item.givenName : item.firstName;
    const lastName = isFromContacts ? item.familyName : item.lastName;
    const phone = isFromContacts
      ? (item.phoneNumbers.length > 0 ? item.phoneNumbers[0].number : 'Start a new chat')
      : item.phone === ''
      ? 'Start a new chat'
      : `You: ${item.phone}`;

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(ScreenNames.ChatScreen, {
            name: `${firstName} ${lastName}`,
            initials: getInitials(firstName, lastName),
            contact: `${firstName}_${lastName}`,
          })
        }
      >
        <View style={styles.resultItem}>
          <View style={[styles.profileCircle, { backgroundColor: getRandomColor() }]}>
            <Text style={styles.profileInitials}>
              {getInitials(firstName, lastName)}
            </Text>
          </View>
          <View style={styles.resultInfo}>
            <Text style={styles.resultName}>
              {firstName} {lastName}
            </Text>
            <Text style={styles.resultPhoneNumber}>{phone}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={Icons.back} style={styles.backIcon} />
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#AAB4BE"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Image source={Icons.close} style={styles.clearIcon} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.searchResults}>
          {filteredData.length === 0 && searchQuery !== '' ? (
            <View style={styles.noResultsContainer}>
              <Image source={Images.noResults} style={styles.noResultsImage} />
              <Text style={styles.noResultsText}>{strings.no_results}</Text>
            </View>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={filteredData}
              renderItem={renderItem}
              keyExtractor={(item) => (item.recordID ? item.recordID.toString() : item.id.toString())}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NewChatScreen;


