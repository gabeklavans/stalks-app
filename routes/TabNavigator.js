import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeStack from './HomeStack'
import Settings from '../screens/Settings'

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={style} initialRouteName='Home'>
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    );
}

export default TabNavigator

const style = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
            iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
        } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
    },
})