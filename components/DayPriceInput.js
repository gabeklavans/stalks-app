import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Form, Item, Input, Label } from 'native-base'

import Days from '../assets/Days'

const DayPriceInput = ({ handler, value, day }) => {
    return (
        <Form style={styles.container}>
            <Item rounded style={styles.input}>
                {/* <Label style={styles.label}>{Days[day].short} AM</Label> */}
                <Input
                    style={{ textAlign: 'center' }}
                    placeholder='AM'
                    placeholderTextColor='rgba(140, 114, 127, 0.6)'
                    keyboardType='number-pad'
                    returnKeyType='done'
                    maxLength={3}
                    onChangeText={text => handler(day, 0, text)}
                    value={value[day][0]}
                />
            </Item>
            <Text style={{width: '15%', textAlign: 'center'}} >{Days[day].short}</Text>
            <Item rounded style={styles.input}>
                {/* <Label style={styles.label}>{Days[day].short} PM</Label> */}
                <Input
                    style={{ textAlign: 'center' }}
                    placeholder='PM'
                    placeholderTextColor='rgba(140, 114, 127, 0.6)'
                    keyboardType='number-pad'
                    returnKeyType='done'
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
        // marginVertical: '3%',
        // height: '7.5%'
    },
    input: {
        width: 90,
        height: '70%'
    },
    label: {
        fontSize: 12
    }
})
