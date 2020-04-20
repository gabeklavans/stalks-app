import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeStack from './HomeStack'
import Predictions from '../screens/Predictions'
import History from '../screens/History'

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator screenOptions={{}} initialRouteName='Home'>
            <Drawer.Screen name="Home" component={HomeStack} />
            <Drawer.Screen name="History" component={History} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;

const options = {

}