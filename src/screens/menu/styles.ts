import { StyleSheet } from "react-native";
import colors from '../../utils/colors';

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.secondary,
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
      color: colors.noResults,
      marginVertical: 20,
    },
    startChatButton: {
      backgroundColor: colors.circle,
      borderRadius: 8,
      paddingHorizontal: 50,
      paddingVertical: 10,
    },
    startChatButtonText: {
      color: colors.white,
      fontWeight: '600',
    },
    modalBackground: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    modalContent: {
      backgroundColor: colors.white,
      paddingVertical: 20,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    },
    modalOption: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderBottomColor,
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
      backgroundColor: colors.white,
      borderBottomColor: colors.borderBottomColor,
      borderBottomWidth: 1,
      justifyContent: 'space-between',
    },
    profileCircle: {
      backgroundColor: colors.primary,
      borderRadius: 25,
      width: 50,
      height: 50,
      marginHorizontal: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    profileInitials: {
      color: colors.white,
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
      color: colors.resultPhone,
    },
    resultTime: {
      fontSize: 14,
      color: colors.resultPhone,
    },
    timeText: {
      color: '#8e8e8e',
      fontSize: 14,
      // alignSelf: 'flex-end',
      right:10,
    },
  });