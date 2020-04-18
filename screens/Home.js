import React, { useState } from 'react'
import { StyleSheet, AsyncStorage, Alert } from 'react-native'
import { Container, Button, Text, Content, Header, Left, Icon, Right, Title, Body, Form, Item, Picker, Input, View } from 'native-base';

import Colors from '../assets/Colors';
import { color } from 'react-native-reanimated';

const Home = ({ navigation }) => {
    const [dayPhase, setDayPhase] = useState('AM');
    const [enteredVal, setEnteredVal] = useState('');

    const navigateHistoryHandler = () => {
        navigation.navigate('History')
    }

    const numberInputHandler = inputText => {
        setEnteredVal(inputText.replace(/[^0-9]/g, ''));
    }

    const dayPhaseSelectorHandler = () => {
        if (dayPhase === 'AM') {
            setDayPhase('PM');
        } else if (dayPhase === 'PM') {
            setDayPhase('AM');
        }
    }

    const submitInputHandler = async price => {
        try {
            // const oldList = await AsyncStorage.getItem('priceHistory')
            await AsyncStorage.setItem('priceHistory', JSON.stringify([{key: Math.random().toString(), value: price}]))
            Alert.alert('Success!', 'Price saved', [{text: 'Cool', style: 'default'}])
        } catch (error) {
            Alert.alert('Failed!', 'Price NOT saved', [{text: 'Darn', style: 'destructive'}])
        }
    }

    let submitButton;

    if (enteredVal > 0) {
        submitButton = (
            <Button block style={{ backgroundColor: Colors.iconBackground }} onPress={() => submitInputHandler(enteredVal)}>
                <Text>Submit!</Text>
            </Button>
        )
    } else {
        submitButton = undefined;
    }

    return (
        <Container>
            <Content contentContainerStyle={styles.content}>
                <Text>Home screen</Text>
                <View style={styles.button}>
                    <Button bordered small block primary onPress={navigateHistoryHandler}>
                        <Text>Go to History</Text>
                    </Button>
                </View>
                <Form style={styles.form}>
                    <Item regular style={{ width: 70 }}>
                        <Input
                            style={{ textAlign: 'center' }}
                            placeholder='...'
                            keyboardType='number-pad'
                            maxLength={3}
                            onChangeText={numberInputHandler}
                            value={enteredVal}
                        />
                    </Item>
                    <Button block onPress={dayPhaseSelectorHandler}>
                        <Text>{dayPhase}</Text>
                    </Button>
                </Form>
                {submitButton}
            </Content>
        </Container>
    )
}

export default Home

const styles = StyleSheet.create({
    content: {
        padding: 20,
        alignItems: 'center'
    },
    form: {
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        height: 48
    }
})
