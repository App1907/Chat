import React, { useEffect } from 'react';
import { View, Image, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Images } from '../../assets';
import styles from './styles';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('BottomStack'); 
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






// import React, { useEffect } from 'react';
// import { View, Text, Image, StyleSheet, ImageBackground} from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import styles from './styles';


// const SplashScreen = () => {
//   const navigation = useNavigation();

//   const checkLoginStatus = async () => {
//     try {
//       const login = await AsyncStorage.getItem('isLogin');
//       console.log(login);

//       if (login === 'true') {
//         navigation.replace('BottomStack');
//       } else {
//         navigation.replace('TutorialScreen');
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//         checkLoginStatus(); 

//     }, 2000);

//     return () => clearTimeout(timer); 
//   }, [navigation]);

//   return (
//     <ImageBackground source={require('../../assets/icons/landing.png')} style={styles.backgroundImage} >
//     <View style={styles.container}>
//       <Image source={require('../../assets/icons/splash.png')} style={styles.logo} />
//     </View>
//     </ImageBackground>
//   );
// };


// export default SplashScreen;