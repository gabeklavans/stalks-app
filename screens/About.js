import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { Container, Content, Header, Icon, Button, Footer } from 'native-base'
import { fonts } from '../assets/Fonts'
import Colors from '../assets/Colors'
import { Linking } from 'expo'
import Anchor from '../components/Anchor'

const About = ({ navigation }) => {

    return (
        <Container style={{ backgroundColor: Colors.appBackground }}>
            <Content contentContainerStyle={styles.content}>
                <Text style={{ ...styles.text, fontSize: 20 }}>Credits</Text>
                <View style={styles.row}>
                    <Text style={styles.text}>{'\u2022'} </Text>
                    <Anchor href='https://github.com/mikebryant' style={styles.text}>mikebryant</Anchor>
                </View>
                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.text}>for the scripts that generate the predictions (I literally couldn't have made this without it and the work of all the people that helped make it); also creator of the site</Text>
                    <Anchor href='https://turnipprophet.io/' style={styles.text}>turnipprophet.io</Anchor>
                    <Text style={styles.text}>from which I drew heavy inspiration from (read: copied)</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>{'\u2022'} </Text>
                    <Anchor href='https://www.aahwang.com/' style={styles.text}>Aaron Hwang</Anchor>
                </View>
                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.text}>for most of the design choices and all the graphics</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>{'\u2022'} </Text>
                    <Anchor href='https://www.youtube.com/channel/UCSJbGtTlrDami-tDGPUV9-w/featured' style={styles.text}>Academind</Anchor>
                </View>
                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.text}>for their consistently amazing coding tutorials</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>{'\u2022'} </Text>
                    <Text style={styles.text}>All my friends and family that reminded me to be a human as I coded this app up in a frenzy 💗</Text>
                </View>


                <View style={{marginTop: 20}}>
                    <Anchor style={{...styles.text, fontSize: 20}} href='https://github.com/gabeklavans/stalks-app' >GitHub</Anchor>
                    <Text style={styles.text}>Have a feature request? Want to open an issue? Want to fix my spaghetti code (and maybe teach me some good coding practices)? Then check out the repository for this app!</Text>
                </View>
            </Content>
        </Container>
    )
}

export default About

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.iconBackground
    },
    text: {
        fontFamily: fonts.main
    },
    content: {
        // flex: 1,
        width: '100%',
        height: '100%',
        // justifyContent: 'space-between',
        padding: 10
        // backgroundColor: 'red'
    },
    row: {
        flexDirection: 'row',
        marginTop: 10,
    },
    heading: {

        fontFamily: fonts.main
    }
})
