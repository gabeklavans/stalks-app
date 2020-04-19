import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, AsyncStorage, Alert, KeyboardAvoidingView, Dimensions } from 'react-native'
import { Container, Button, Text, Content, Header, Left, Icon, Right, Title, Body, Form, Item, Picker, Input, View } from 'native-base';

import _ from "lodash";
import { PriceContext, FirstBuyContext, PatternContext } from '../components/GlobalContext';

import DayPriceInput from '../components/DayPriceInput'
import Colors from '../assets/Colors';

const Home = ({ navigation, route }) => {
    const [prices, setPrices] = useContext(PriceContext);
    const [firstBuy, setFirstBuy] = useContext(FirstBuyContext);
    const [pattern, setPattern] = useContext(PatternContext);
    const [firstBuyText, setFirstBuyText] = useState('No');
    // console.log(route)

    const setPriceHandler = (day, time, price) => {
        setPrices(oldPrices => {
            let newPrices = JSON.parse(JSON.stringify(oldPrices));
            // Sanatize inputs too, to only numbers
            newPrices[day][time] = price.replace(/[^0-9]/g, '');
            return newPrices
        });
    }

    const firstTimeButtonHandler = () => {
        if (firstBuy) {
            setFirstBuy(false);
            setFirstBuyText('No')
        } else {
            setFirstBuy(true);
            setFirstBuyText('Yes')
        }
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
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', alignItems: 'center' }}>
                        <Text>First buy on your island?</Text>
                        <View style={{ width: '20%' }}>
                            <Button style={{ backgroundColor: Colors.iconBackground }} block small onPress={firstTimeButtonHandler} >
                                <Text>{firstBuyText}</Text>
                            </Button>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text>Pattern:</Text>
                        <Form>
                            <Picker
                                iosHeader="Pattern"
                                iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "#007aff", fontSize: 25 }} />}
                                mode='dialog'
                                style={{ width: 120 }}
                                selectedValue={pattern}
                                onValueChange={setPattern}
                                textStyle={{color: '#007aff'}}
                            >
                                <Picker.Item label='Fuk u idk' value={-1} />
                                <Picker.Item label='Fluctuating' value={0} />
                            </Picker>
                        </Form>
                    </View>
                </KeyboardAvoidingView>
            </Content>
        </Container >
    )
}

export default Home

const styles = StyleSheet.create({
    content: {
        // flex: 1,
        alignItems: 'center',
        width: '100%',
        height: Dimensions.get('window').height * .75,
        justifyContent: 'space-between',
        // backgroundColor: 'red'
    }
})
