import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { Container, Content, Header, Icon, Button, Footer } from 'native-base'
import { fonts } from '../assets/Fonts'
import Colors from '../assets/Colors'

const About = ({ navigation }) => {

    // Handler for the menu button
    const menuButtonHandler = () => {
        navigation.openDrawer();
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Button onPress={menuButtonHandler} transparent full style={{ justifyContent: 'center' }}><Icon name='ios-menu' style={{ fontSize: 30, color: 'white' }} /></Button>
            ),
            headerStyle: {
                height: Dimensions.get('screen').height * 0.12,
                backgroundColor: Colors.iconBackground
            }
        });
    }, [navigation]);

    return (
        <Container>
            <Content contentContainerStyle={styles.content}>
                <Text>Thanks to all my bros out there</Text>
            </Content>
        </Container>
    )
}

export default About

const styles = StyleSheet.create({
    screen: {
        backgroundColor: Colors.appBackground
    },
    header: {
        backgroundColor: Colors.iconBackground
    },
    text: {
        fontFamily: fonts.main
    },
    content: {
        // flex: 1,
        width: '100%',
        height: Dimensions.get('window').height * .75,
        justifyContent: 'space-between',
        padding: 10
        // backgroundColor: 'red'
    },
})
