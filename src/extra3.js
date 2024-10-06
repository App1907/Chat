import React, { useEffect } from 'react';
import { View, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import styles from './styles';

// Define your navigation types
type RootStackParamList = {
  BottomStack: undefined; // Define other routes as needed
  // Add other routes and their parameters if necessary
};

const SplashScreen: React.FC = () => {
  // Use the defined types with useNavigation
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('BottomStack');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground source={require('../../assets/icons/landing.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Image source={require('../../assets/icons/splash.png')} style={styles.logo} />
      </View>
    </ImageBackground>
  );
};

export default SplashScreen;
