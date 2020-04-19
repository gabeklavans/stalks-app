import React, { useState, useContext } from 'react'
import { StyleSheet, AsyncStorage, Alert, KeyboardAvoidingView } from 'react-native'
import { Container, Button, Text, Content, Header, Left, Icon, Right, Title, Body, Form, Item, Picker, Input, View } from 'native-base';

import _ from "lodash";
import { PriceContext } from '../components/PriceContext';

import DayPriceInput from '../components/DayPriceInput'
import Colors from '../assets/Colors';

const Home = ({ navigation, route }) => {

    const [prices, setPrices] = useContext(PriceContext);
    // console.log(route)

    const setPriceHandler = (day, time, price) => {
        setPrices(oldPrices => {
            let newPrices = JSON.parse(JSON.stringify(oldPrices));
            // Sanatize inputs too, to only numbers
            newPrices[day][time] = price.replace(/[^0-9]/g, '');
            return newPrices
        });
    }

    const submitInputHandler = async price => {
        try {
            // const oldList = await AsyncStorage.getItem('priceHistory')
            await AsyncStorage.setItem('priceHistory', JSON.stringify([{ key: Math.random().toString(), value: price }]))
            Alert.alert('Success!', 'Price saved', [{ text: 'Cool', style: 'default' }])
        } catch (error) {
            Alert.alert('Failed!', 'Price NOT saved', [{ text: 'Darn', style: 'destructive' }])
        }
    }

    let submitButton;

    return (
        <Container>
            <Content style={{ padding: '5%' }}>
                <KeyboardAvoidingView behavior='padding' style={styles.content}>
                    <Text>Enter your turnip prices for the week!</Text>
                    <DayPriceInput handler={setPriceHandler} value={prices} day={0} />
                    <DayPriceInput handler={setPriceHandler} value={prices} day={1} />
                    <DayPriceInput handler={setPriceHandler} value={prices} day={2} />
                    <DayPriceInput handler={setPriceHandler} value={prices} day={3} />
                    <DayPriceInput handler={setPriceHandler} value={prices} day={4} />
                    <DayPriceInput handler={setPriceHandler} value={prices} day={5} />
                    <DayPriceInput handler={setPriceHandler} value={prices} day={6} />
                </KeyboardAvoidingView>
            </Content>
        </Container >
    )
}

export default Home

const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
        width: '100%'
    }
})
