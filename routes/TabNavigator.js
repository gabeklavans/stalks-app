/* I don't actually use this lol */
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeStack from './HomeStack'
import Predictions from '../screens/Predictions'

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={styles.home} initialRouteName='Home'>
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen options={styles.predictions} name="Predictions" component={Predictions} />
        </Tab.Navigator>
    );
}

export default TabNavigator

const styles = {
    home: () => ({
        tabBarIcon: ({ color, size }) => {
            return <Ionicons name='ios-home' size={size} color={color} />
        }
    }),
    predictions: () => ({
        tabBarIcon: ({ color, size }) => {
            return <Ionicons name='ios-stats' size={size} color={color} />
        }
    })
}