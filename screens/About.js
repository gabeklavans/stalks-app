import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { Container, Content, Header, Icon, Button, Footer } from 'native-base'
import { fonts } from '../assets/Fonts'
import Colors from '../assets/Colors'

const About = ({ navigation }) => {

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
