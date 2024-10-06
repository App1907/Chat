import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import homeIcon from "../../assets/images/homes.png";
import settingsIcon from "../../assets/images/star.png";
import shopIcon from "../../assets/images/user.png";
import Icon from "../../assets/images/menuIcon.png";
//import DrawerStack from './DrawerStack';
import Home from '../../screens/home';
// import HomeScreen from '../../screens/homeScreen';
import Account from '../../screens/account';
import Favourites from '../../screens/favourites';
import Menu from '../../screens/menu';

const Tab = createBottomTabNavigator();

const BottomStack = () => {
    return (
        <Tab.Navigator>

            <Tab.Screen name="MENU" component={Menu}
                options={{
                    headerShown: false,
                    tabBarIcon: () => (
                        <Image
                            source={Icon}
                            style={{ width: 20, height: 20 }}
                        />
                    ),
                }}
            />
            <Tab.Screen name="ACCOUNT" component={Account}
                options={{
                    tabBarIcon: () => (
                        <Image
                            source={shopIcon}
                            style={{ width: 25, height: 25 }}
                        />
                    ),
                }}
            />

            <Tab.Screen name="FAVOURITES" component={Favourites}
                options={{
                    tabBarIcon: () => (
                        <Image
                            source={settingsIcon}
                            style={{ width: 25, height: 25 }}
                        />
                    ),
                }}
            />

            <Tab.Screen name="HOME" component={Home} options={{
                // headerShown: false,

                tabBarIcon: () => (
                    <Image
                        source={homeIcon}
                        style={{ width: 25, height: 25 }}
                    />
                ),

            }}
            />
        </Tab.Navigator>
    );
}

export default BottomStack;