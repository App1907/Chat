import React from 'react';
import { View, Text, Modal, StyleSheet, Image, TouchableOpacity } from 'react-native';

const SecureAccountModal = ({ visible, closeModal }) => {

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible} 
      onRequestClose={closeModal}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Image
            source={require('../assets/icons/secure_account.png')}
            style={styles.image}
          />
          <Text style={styles.title}>Secure your Account ?</Text>
          <Text style={styles.description}>
            Setup two-factor authentication to secure your account in just two steps.
          </Text>
          <View style={styles.stepsContainer}>
            <View style={styles.step}>
              <Image
                source={require('../assets/icons/phone.png')}
                style={styles.stepIcon}
              />
              <Text style={styles.stepText}>Link your account with your phone number</Text>
            </View>
            <View style={styles.step}>
              <Image
                source={require('../assets/icons/code.png')}
                style={styles.stepIcon}
              />
              <Text style={styles.stepText}>Enter the one-time passcode</Text>
            </View>
            <View style={styles.step}>
              <Image
                source={require('../assets/icons/secure_tick.png')}
                style={styles.stepIcon}
              />
              <Text style={styles.stepText}>Secure your account</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={closeModal}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '100%',
    height: 570,
    padding: 20,
    backgroundColor: '#E6EDF3',
    borderRadius: 20,
    alignItems: 'center',
  },
  image: {
    width: 111,
    height: 148,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  description: {
    color: '#777',
    fontSize: 15,
    fontWeight: '400',
    marginBottom: 20,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  stepsContainer: {
    width: '100%',
    marginLeft: 10,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  stepIcon: {
    width: 40,
    height: 60,
    marginRight: 10,
  },
  stepText: {
    color: '#000',
    marginBottom:10
  },
  button: {
    width:345,
    height:56,
    backgroundColor: '#2A7BBB',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 100,
    marginBottom:30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SecureAccountModal;