import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { fonts } from '../assets/Fonts'

const CustomText = props => {
    return (
        <Text {...props} style={{ fontFamily: fonts.main }} >{props.children}</Text>
    )
}

export default CustomText

const styles = StyleSheet.create({})
