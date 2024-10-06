import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const TutorialScreen = () => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Welcome to the App!',
      description: 'Discover all the amazing features we offer.',
      image: require('../../assets/icons/tutorial1.png'),
    },
    {
      title: 'Track Your Orders',
      description: 'Easily track the status of your orders with real-time updates.',
      image: require('../../assets/icons/tutorial2.png'),
    },
    {
      title: 'Manage Your Account',
      description: 'Update your profile, manage preferences, and more in the account section.',
      image: require('../../assets/icons/tutorial3.png'),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'SignInScreen' }],
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'SignInScreen' }],
    });
  };

  return (
    <View style={styles.container}>
      <Image source={steps[currentStep].image} style={styles.image} />
      <Text style={styles.title}>{steps[currentStep].title}</Text>
      <Text style={styles.description}>{steps[currentStep].description}</Text>

      <View style={styles.pagination}>
        {steps.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, index === currentStep ? styles.activeDot : styles.inactiveDot]}
          />
        ))}
      </View>

      <View style={styles.buttonContainer}>
        {currentStep > 0 && (
          <TouchableOpacity style={styles.previousButton} onPress={handlePrevious}>
            <Text style={styles.previousButtonText}>Previous</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>{currentStep === steps.length - 1 ? 'Finish' : 'Next'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipButtonText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};


export default TutorialScreen;