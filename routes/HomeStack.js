import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Image, Dimensions } from 'react-native'
import { Container, Button, Text, Content, Header, Left, Icon, Right, Title, Body } from 'native-base';

import Home from '../screens/Home'
import Predictions from '../screens/Predictions'

import Colors from '../assets/Colors'

const Stack = createStackNavigator();

const HomeStack = ({ route }) => {
    return (
        <Stack.Navigator initialRouteName='Home' screenOptions={navStyles.header}>
            <Stack.Screen name="Home" component={Home} options={navStyles.home} />
            <Stack.Screen name="Predictions" component={Predictions} />
        </Stack.Navigator>
    )
}

export default HomeStack

const navStyles = {
    header: {
        headerStyle: {
            height: 80,
            // height: Dimensions.get('screen').height * 0.12,
            backgroundColor: Colors.iconBackground
        },
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    },
    home: {
        headerTitle: (<Image style={{ width: 50, height: 50 }} source={require('../assets/stalks-app-logo.png')}/>)
        // headerTitle: (<Button block><Text>Yo</Text></Button>)
        // headerTitle: (
        //     <Header>
        //         <Left>
        //             <Button transparent>
        //                 <Icon name='menu' />
        //             </Button>
        //         </Left>
        //         <Body>
        //             <Title>Header</Title>
        //         </Body>
        //         <Right />
        //     </Header>
        // )
    }
}