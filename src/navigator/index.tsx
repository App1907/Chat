import React, {useEffect} from 'react';
import { Dimensions, SafeAreaView, StatusBar, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomStack from './bottomTab';
import SplashScreen from '../screens/splashScreen';
import TutorialScreen from '../screens/tutorialScreen';
import NewChatScreen from '../screens/newScreen';
import ChatScreen from '../screens/chatScreen';
// import SignInScreen from '../screens/signIn';
//import HomeScreen from '../screens/homeScreen';



const Stack = createNativeStackNavigator();



const RootNavigator = () => {
  // const [initialRoute, setInitialRoute] = React.useState('SplashScreen');

  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     try {
  //       const login = await AsyncStorage.getItem('isLogin');
  //       if (login === 'true') {
  //         setInitialRoute('HomeScreen');
  //       } else {
  //         setInitialRoute('TutorialScreen');
  //       }
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };

  //   checkLoginStatus();
  // }, []);

  return (
    <NavigationContainer>
      <View style={{ flex: 1, }}>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator initialRouteName="splashScreen">
      <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TutorialScreen"
          component={TutorialScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NewScreen"
          component={NewChatScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{ headerShown: false }}
        />

        {/* <Stack.Screen 
          name="SignInScreen" 
          component={SignInScreen} 
          options={{ headerShown: false }} 
        /> */}

        {/* <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen} 
          options={{ title: '', headerShown: false }} 
        /> */}

        <Stack.Screen 
        name="BottomStack" 
        component={BottomStack} 
        options={{ headerShown: false }} 
        /> 
 
      </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
};


export default RootNavigator;