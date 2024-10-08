import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import Contacts from 'react-native-contacts';
import { Icons, Images } from '../../assets';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import strings from '../../utils/strings';

const Account = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [contacts, setContacts] = useState([]);


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
    } catch (err) {
      console.warn(err);
      return false;
    }
  };


  const loadContacts = () => {
    Contacts.getAll()
      .then((contacts) => {
        setContacts(contacts);
        setFilteredData(contacts);
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

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text === '') {
      setFilteredData(contacts);
    } else {
      const results = contacts.filter((item) =>
        `${item.givenName} ${item.familyName}`
          .toLowerCase()
          .includes(text.toLowerCase())
      );
      setFilteredData(results);
    }
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
  };

  const getRandomColor = () => {
    const colors = ['#FFB6C1', '#8A2BE2', '#5F9EA0', '#FF6347', '#FFD700', '#40E0D0'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ChatScreen', {
          name: `${item.givenName} ${item.familyName}`,
          initials: getInitials(item.givenName, item.familyName),
          contact: `${item.givenName}_${item.familyName}`,
        })
      }
    >
      <View style={styles.resultItem}>
        <View style={[styles.profileCircle, { backgroundColor: getRandomColor() }]}>
          <Text style={styles.profileInitials}>
            {getInitials(item.givenName, item.familyName)}
          </Text>
        </View>
        <View style={styles.resultInfo}>
          <Text style={styles.resultName}>
            {item.givenName} {item.familyName}
          </Text>
          <Text style={styles.resultPhoneNumber}>
            {item.phoneNumbers.length === 0
              ? strings.start_new_chat
              : `You: ${item.phoneNumbers[0].number}`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

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
              <Text style={styles.noResultsText}>No results found</Text>
            </View>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={filteredData}
              renderItem={renderItem}
              keyExtractor={(item) => item.recordID}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Account;



