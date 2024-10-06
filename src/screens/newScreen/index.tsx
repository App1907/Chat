import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { Icons, Images } from '../../assets';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../utils/dimension';
import jsonData from '../../assets/data.json';
import { SafeAreaView } from 'react-native-safe-area-context';

const NewChatScreen = ({ navigation }: { navigation: any }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(jsonData.users);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text === '') {
      setFilteredData([]);
    } else {
      const results = jsonData.users.filter((item) =>
        `${item.firstName} ${item.lastName}`
          .toLowerCase()
          .includes(text.toLowerCase())
      );
      setFilteredData(results);
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0).toUpperCase()}${lastName
      .charAt(0)
      .toUpperCase()}`;
  };

  const renderItem = ({ item }: any) => (
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
              keyExtractor={(item) => item.id.toString()}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 16,
    paddingVertical: 10,
    elevation: 2,
    backgroundColor: '#F8F9F9',
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
  },
  backIcon: {
    height: 40,
    width: 40,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    fontSize: 16,
    marginLeft: 5,
  },
  clearIcon: {
    height: 24,
    width: 24,
    marginLeft: 10,
  },
  searchResults: {
    flex: 1,
    padding: 16,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  noResultsText: {
    fontSize: 18,
    color: '#7E8A9A',
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
  resultName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultPhoneNumber: {
    fontSize: 14,
    color: '#AAB4BE',
  },
});

export default NewChatScreen;


