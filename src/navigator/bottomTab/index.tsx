import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleProp, ImageStyle } from 'react-native';
import {Images} from '../../assets';
import Home from '../../screens/home';
import Account from '../../screens/account';
import Favourites from '../../screens/favourites';
import Menu from '../../screens/menu';
//import DrawerStack from './DrawerStack';
// import HomeScreen from '../../screens/homeScreen'

type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

const Tab = createBottomTabNavigator();

const BottomStack: React.FC = () => {
  return (
    <Tab.Navigator initialRouteName="MENU">
      <Tab.Screen
        name="HOME"
        component={Home}
        options={{
          tabBarIcon: ({ size }: TabBarIconProps) => (
            <Image
              source={Images.homeIcon}
              style={{ width: size, height: size } as StyleProp<ImageStyle>}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ACCOUNT"
        component={Account}
        options={{
          tabBarIcon: ({ size }: TabBarIconProps) => (
            <Image
              source={Images.shopIcon}
              style={{ width: size, height: size } as StyleProp<ImageStyle>}
            />
          ),
        }}
      />
      <Tab.Screen
        name="FAVOURITES"
        component={Favourites}
        options={{
          tabBarIcon: ({ size }: TabBarIconProps) => (
            <Image
              source={Images.settingsIcon}
              style={{ width: size, height: size } as StyleProp<ImageStyle>}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MENU"
        component={Menu}
        options={{
          headerShown: false,
          tabBarIcon: ({ size }: TabBarIconProps) => (
            <Image
              source={Images.Icon}
              style={{ width: size - 5, height: size - 5 } as StyleProp<ImageStyle>} // Slightly smaller size
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomStack;











