import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Path } from 'react-native-svg-charts'

const LineShadow = ({ lines, num, color }) => {
    // console.log(line)
    return (
        <Path
            key={'shadow'}
            y={2}
            d={lines[num]}
            fill={'none'}
            strokeWidth={4}
            stroke={color}
        />
    )
}

export default LineShadow

const styles = StyleSheet.create({})
