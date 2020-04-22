import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeStack from './HomeStack'
import AboutStack from '../routes/AboutStack';

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