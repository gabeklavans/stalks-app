import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Settings = () => {
    return (
        <View style={styles.screen}>
            <Text>Settings!</Text>
        </View>
    );
}

export default Settings

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
