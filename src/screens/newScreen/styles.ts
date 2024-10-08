import { StyleSheet } from "react-native";

export default StyleSheet.create({
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