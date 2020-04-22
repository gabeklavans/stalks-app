import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { Form, Item, Input } from 'native-base'

import Days from '../assets/Days'
import Colors from '../assets/Colors'
import { fonts } from '../assets/Fonts'

const DayPriceInput = ({ handler, value, day }) => {
    return (
        <Form style={styles.container}>
            <Item rounded style={styles.input}>
                <Input
                    style={styles.inputField}
                    placeholder='AM'
                    placeholderTextColor='rgba(140, 114, 127, 0.6)'
                    keyboardType='number-pad'
                    returnKeyType='done'
                    clearButtonMode='while-editing'
                    maxLength={3}
                    onChangeText={text => handler(day, 0, text)}
                    value={value[day][0]}
                />
            </Item>
            <Text style={{width: '15%', textAlign: 'center', ...styles.text}} >{Days[day].short}</Text>
            <Item rounded style={styles.input}>
                <Input
                    style={styles.inputField}
                    placeholder='PM'
                    placeholderTextColor='rgba(140, 114, 127, 0.6)'
                    keyboardType='number-pad'
                    returnKeyType='done'
                    clearButtonMode='while-editing'
                    maxLength={3}
                    onChangeText={text => handler(day, 1, text)}
                    value={value[day][1]}
                />
            </Item>
        </Form>
    )
}

export default DayPriceInput

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
    },
    input: {
        width: 90,
        height: '70%',
        backgroundColor: 'white'
    },
    inputField: {
        textAlign: 'center',
        fontFamily: fonts.main
    },
    text: {
        fontFamily: fonts.main
    }
})
