import React, { useEffect } from 'react';
import { View, Image, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Images } from '../../assets';
// import screensName from '../../navigator/screensName';
import styles from './styles';

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'BottomStack' }],
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground source={Images.landing_img} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Image source={Images.splash_img} style={styles.logo} />
      </View>
    </ImageBackground>
  );
};

export default SplashScreen;






