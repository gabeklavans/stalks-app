import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeStack from './HomeStack'
import Predictions from '../screens/Predictions'

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator screenOptions={{}} initialRouteName='Home'>
            <Drawer.Screen name="Home" component={HomeStack} />
            <Drawer.Screen name="Predictions" component={Predictions} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;