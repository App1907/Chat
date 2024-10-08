import { StyleSheet } from "react-native";

export default StyleSheet.create({
    safearea: {
      flex: 1,
      backgroundColor: '#F8F9F9',
    },
    container: {
      flex: 1,
      backgroundColor: '#e7edf3',
    },
    header: {
      backgroundColor: '#F8F9F9',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      elevation: 2,
      borderBottomColor: '#E5E5E5',
      borderBottomWidth: 1,
    },
    backIcon: {
      height: 40,
      width: 40,
      marginRight: 10,
      marginBottom: 10,
    },
    profileCircle: {
      backgroundColor: '#B0343C',
      borderRadius: 25,
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
      marginBottom: 10,
    },
    profileInitials: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
    headerTextContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerDetails: {
      flexDirection: 'column',
      flex: 1,
    },
    headerTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#4A4A4A',
      width: 180,
    },
    status: {
      fontSize: 14,
      color: '#AAB4BE',
    },
    moreIcon: {
      height: 40,
      width: 40,
    },
    inputToolbar: {
      borderTopColor: '#E5E5E5',
      borderTopWidth: 1,
    },
    plusIcon: {
      width: 24,
      height: 24,
      marginLeft: 10,
      marginBottom: 8,
    },
    sendIcon: {
      width: 24,
      height: 24,
    },
    sendButtonContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
    textInput: {
      color: '#4A4A4A',
      fontSize: 16,
    },
    modalBackground: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      paddingVertical: 20,
      paddingHorizontal: 10,
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
    reactionsContainer: {
      flexDirection: 'row',
      marginTop: 5,
      paddingHorizontal: 10,
    },
    reactionText: {
      fontSize: 18,
      marginRight: 8,
    },
  });