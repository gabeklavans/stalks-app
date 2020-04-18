import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Content, Button, Text } from 'native-base';

import predict from '../scripts/predictions'

const Settings = () => {

    const buttonPressHandler = () => {
        const nanArray = new Array(12).fill(NaN);
        // console.log(nanArray)
        predict([90,90, ...nanArray], false, 0);
    }

    return (
        <Container>
            <Content contentContainerStyle={{padding: 50}}>
                <Button onPress={buttonPressHandler}>
                    <Text>
                        Get some predictions
                    </Text>
                </Button>
            </Content>
        </Container>
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
