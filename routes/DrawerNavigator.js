import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeStack from './HomeStack'
import Predictions from '../screens/Predictions'
import History from '../screens/History'
import Colors from '../assets/Colors';
import AboutStack from '../routes/AboutStack';
import { fonts } from '../assets/Fonts';
import { Dimensions } from 'react-native';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName='Home'>
            <Drawer.Screen name="Home" component={HomeStack} />
            {/* <Drawer.Screen name="History (Coming Soon!)" component={History} /> */}
            <Drawer.Screen name='About' component={AboutStack} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;

const navStyles = {
}