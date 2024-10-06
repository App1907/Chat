import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      padding: 20,
    },
    image: {
      width: 300,
      height: 200,
      marginBottom: 20,
      resizeMode: 'contain',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000',
      marginBottom: 10,
      textAlign: 'center',
    },
    description: {
      fontSize: 16,
      color: '#4F5F72',
      marginBottom: 40,
      textAlign: 'center',
      paddingHorizontal: 20,
    },
    pagination: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginHorizontal: 5,
    },
    activeDot: {
      backgroundColor: '#486284',
    },
    inactiveDot: {
      backgroundColor: '#C8CFD6',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: 15,
    },
    previousButton: {
      backgroundColor: '#C8CFD6',
      padding: 15,
      borderRadius: 10,
      width: '45%',
      alignItems: 'center',
    },
    previousButtonText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: '700',
    },
    nextButton: {
      backgroundColor: '#486284',
      padding: 15,
      marginLeft:40,
      borderRadius: 10,
      width: '45%',
      alignItems: 'center',
    },
    nextButtonText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: '700',
    },
    skipButton: {
      alignItems: 'center',
    },
    skipButtonText: {
      color: '#486284',
      fontSize: 16,
      fontWeight: '600',
    },
  });