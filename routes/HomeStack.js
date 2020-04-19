import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native'
import { Container, Button, Text, Content, Header, Left, Icon, Right, Title, Body } from 'native-base';

import Home from '../screens/Home'
import History from '../screens/History'

import Colors from '../assets/Colors'

const Stack = createStackNavigator();

const HomeStack = ({ route }) => {
    return (
        <Stack.Navigator initialRouteName='Home' screenOptions={navStyles.header}>
            <Stack.Screen name="Home" component={Home} options={navStyles.home} />
            <Stack.Screen name="History" component={History} />
        </Stack.Navigator>
    )
}

export default HomeStack

const navStyles = {
    header: {
        headerTintColor: 'yellow',
        headerStyle: {
            height: 80,
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