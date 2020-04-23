import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Image, Alert } from 'react-native'
import { Button, Icon } from 'native-base';

import Home from '../screens/Home'
import Predictions from '../screens/Predictions'

import Colors from '../assets/Colors'
import { fonts } from '../assets/Fonts';

const Stack = createStackNavigator();

const HomeStack = ({ route }) => {
    return (
        <Stack.Navigator initialRouteName='Home' screenOptions={navStyles.header}>
            <Stack.Screen name="Home" component={Home} options={navStyles.home} />
            <Stack.Screen name="Predictions" component={Predictions} options={navStyles.predictions} />
        </Stack.Navigator>
    )
}

export default HomeStack

const homeInfoText = `Enter your prices for each time field.

Toggle on the First Buy switch if this is the first time you're buying turnips on *your* island. It affects this week's pattern and disables the initial value input (it is ignored on your first buy).

Your last week's pattern also affects this week's pattern, but it's ok if you don't know what it was.

See Predictions screen for more info.`

const homeInfoButtonHandler = () => {
    Alert.alert('Inputs Info', homeInfoText, [{text: 'Cool 👍'}])
}

const predictionsInfoText = `Patterns?
The way your prices grow throughout the week falls into 1 of 4 patterns. Their names essentially describe what the price curves will do (e.g. big spike will grow very large for a short time).

Chart 1
Either shows the maximum potential prices for each pattern, or shows both the maximum and minimum prices, giving you a range of prices to consider for each day. The colors correspond to those in chart 2.

Chart 2
Shows the probability of each type of pattern that could occur this week.`

// `The first chart displays the max values you could potentially get from each pattern, following the color coding in the second chart.

// The black line (hopefully at the bottom of the chart) represents the guaranteed minimum price for each day, regardless of pattern.

// The horizontal axis has two entries for each day, the first being the AM and the second being the PM price (except for the initial Sunday price).

// The second chart just shows the chance of getting each kind of pattern.`

const predictionsInfoButtonHandler = () => {
    Alert.alert('Predictions Info', predictionsInfoText, [{text: 'Nice 😎'}])
}

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
    home: ({navigation}) => ({
        headerTitle: (<Image style={{ width: 40, height: 40 }} source={require('../assets/stalks-app-logo.png')} />),
        headerLeft: () => (
            <Button onPress={navigation.openDrawer} transparent full style={{ justifyContent: 'center' }}><Icon name='ios-menu' style={{ fontSize: 30, color: Colors.navButton }} /></Button>
        ),
        headerRight: () => (
            <Button onPress={homeInfoButtonHandler} transparent full style={{ justifyContent: 'center' }}><Icon name='ios-information-circle-outline' style={{ fontSize: 30, color: Colors.navButton }} /></Button>
        )
    }),
    predictions: {
        headerRight: () => (
            <Button onPress={predictionsInfoButtonHandler} transparent full style={{ justifyContent: 'center' }}><Icon name='ios-information-circle-outline' style={{ fontSize: 30, color: Colors.navButton }} /></Button>
        )
    }
}