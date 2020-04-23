import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Icon } from 'native-base';

import Colors from '../assets/Colors'
import { fonts } from '../assets/Fonts';
import About from '../screens/About';

const Stack = createStackNavigator();

const AboutStack = ({ route }) => {
    return (
        <Stack.Navigator initialRouteName='Home' screenOptions={navStyles.header}>
            <Stack.Screen name="About" component={About} options={navStyles.about} />
        </Stack.Navigator>
    )
}

export default AboutStack

const navStyles = {
    header: {
        headerStyle: {
            // height: Dimensions.get('screen').height * 0.12,
            backgroundColor: Colors.iconBackground
        },
        headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: fonts.main
        }
    },
    about: ({ navigation }) => ({
        title: 'About',
        headerLeft: () => (
            <Button onPress={navigation.openDrawer} transparent full style={{ justifyContent: 'center' }}><Icon name='ios-menu' style={{ fontSize: 30, color: Colors.navButton }} /></Button>
        )
    })

}