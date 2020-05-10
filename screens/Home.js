import React, { useContext, useCallback } from 'react'
import { StyleSheet, AsyncStorage, Alert, KeyboardAvoidingView, Dimensions, InteractionManager } from 'react-native'
import { Container, Button, Text, Content, Icon, Form, Item, Picker, Input, View, Switch, Footer, FooterTab } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

import _ from "lodash";
import { PriceContext, FirstBuyContext, PatternContext } from '../components/GlobalContext';

import DayPriceInput from '../components/DayPriceInput'
import Colors from '../assets/Colors';
import { fonts } from '../assets/Fonts';
import { useFocusEffect } from '@react-navigation/native';

const Home = ({ navigation, route }) => {
    const [prices, setPrices] = useContext(PriceContext);
    const [firstBuy, setFirstBuy] = useContext(FirstBuyContext);
    const [pattern, setPattern] = useContext(PatternContext);

    const firstBootChecker = async () => {
        let firstBoot = await AsyncStorage.getItem('firstBoot')

        if (firstBoot == undefined) {
            Alert.alert('Welcome!', 'Your inputs will be saved, even after you close the app (but not if you delete the app!)\nPress the info buttons in the top right for more info on the current screen.\nCheck the top-left menu for a reset button for when the new week starts!', [{text: 'Thanks! 😊'}]);
            await AsyncStorage.setItem('firstBoot', 'The location of my burried treasure is')
        }
    }

    useFocusEffect(
        useCallback(() => {
            const task = InteractionManager.runAfterInteractions(() => {
                firstBootChecker();
            });

            return () => task.cancel();

        })
    )

    // Write through the prices to storage everytime an input field changes
    // Idk if this makes the app slower but it's the solution I've got for now
    // TODO: Maybe limit this to only when user hits the Get Predictions button
    const savePriceDataToStorage = async data => {
        try {
            await AsyncStorage.setItem('priceData', JSON.stringify(data))
        } catch (error) {
            console.error('Failed to put price data into storage')
        }

    }

    // Deep copy the price data and insert this price in the approriate index for that time and day
    const setPriceHandler = (day, time, price) => {
        setPrices(oldPrices => {
            let newPrices = JSON.parse(JSON.stringify(oldPrices));
            // Sanatize inputs too, to only numbers
            newPrices[day][time] = price.replace(/[^0-9]/g, '');
            savePriceDataToStorage(newPrices);
            return newPrices
        });
    }

    // Write through last pattern data to storage
    // Expects data to be an int
    const savePatternDataToStorage = async data => {
        try {
            await AsyncStorage.setItem('lastPattern', data.toString())
        } catch (error) {
            console.error('Failed to put pattern data into storage')
        }
    }

    const setPatternHandler = pattern => {
        setPattern(pattern);
        savePatternDataToStorage(pattern)
    }

    // Write through first buy bool to storage
    // Expects data to be a boolean value
    const saveFirstBuyToggleToStorage = async data => {
        try {
            await AsyncStorage.setItem('firstBuy', data.toString())
        } catch (error) {
            console.error('Failed to put first buy data into storage')
        }
    }

    const firstTimeButtonHandler = () => {
        setFirstBuy(oldFirstBuy => {
            saveFirstBuyToggleToStorage(!oldFirstBuy)
            return !oldFirstBuy;
        });
    }

    let buyPriceField;

    if (firstBuy) {
        buyPriceField = (
            <Input
                style={{ textAlign: 'center' }}
                placeholder='-'
                placeholderTextColor='rgba(140, 114, 127, 0.6)'
                disabled
            />
        )
    } else {
        buyPriceField = (
            <Input
                style={{ ...styles.text, textAlign: 'center' }}
                placeholder='Buy Price'
                placeholderTextColor='rgba(140, 114, 127, 0.6)'
                keyboardType='number-pad'
                returnKeyType='done'
                clearButtonMode='while-editing'
                maxLength={3}
                onChangeText={text => { setPriceHandler(0, 0, text); setPriceHandler(0, 1, text); }}
                value={prices[0][0]}
            />
        )
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

    // Handler for the get predictions button at the bottom of the screen
    const getPredictionsHandler = () => {
        navigation.navigate('Predictions', { prices: prices, pattern: pattern, firstBuy: firstBuy });
    }

    return (
        <Container style={{ backgroundColor: Colors.appBackground }}>
            <Content scrollEnabled={false} contentContainerStyle={{ padding: '5%' }} >
                <KeyboardAvoidingView behavior='padding' style={styles.content}>
                    <Text style={styles.text}>Enter your turnip prices for the week!</Text>
                    <Form style={styles.form}>
                        <Item rounded style={styles.input}>
                            {buyPriceField}
                        </Item>
                    </Form>
                    <DayPriceInput handler={setPriceHandler} value={prices} day={1} />
                    <DayPriceInput handler={setPriceHandler} value={prices} day={2} />
                    <DayPriceInput handler={setPriceHandler} value={prices} day={3} />
                    <DayPriceInput handler={setPriceHandler} value={prices} day={4} />
                    <DayPriceInput handler={setPriceHandler} value={prices} day={5} />
                    <DayPriceInput handler={setPriceHandler} value={prices} day={6} />
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', alignItems: 'center' }}>
                        <Text style={styles.text}>First buy on your island?</Text>
                        <Switch onValueChange={firstTimeButtonHandler} value={firstBuy} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.text}>Last Pattern:</Text>
                        <Form>
                            <Picker
                                iosHeader="Pattern"
                                iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "#007aff", fontSize: 25 }} />}
                                mode='dialog'
                                style={{ width: 150 }}
                                selectedValue={pattern}
                                onValueChange={setPatternHandler}
                                textStyle={{ color: '#007aff', ...styles.text }}
                            >
                                <Picker.Item label="I don't know..." value={-1} />
                                <Picker.Item label='Fluctuating' value={0} />
                                <Picker.Item label='Big Spike' value={1} />
                                <Picker.Item label='Decreasing' value={2} />
                                <Picker.Item label='Small Spike' value={3} />
                            </Picker>
                        </Form>
                    </View>
                </KeyboardAvoidingView>
            </Content>

            <Footer>
                <FooterTab >
                    <Button onPress={getPredictionsHandler} vertical full style={{ backgroundColor: Colors.confirmButton }}>
                        <Ionicons name='ios-trending-up' size={25} color='white' />
                        <Text style={{ color: 'white', fontWeight: 'bold', ...styles.text }}>Get predictions!</Text>
                    </Button>
                </FooterTab>

            </Footer>
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
    },
    form: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
    },
    input: {
        width: 140,
        height: '70%',
        backgroundColor: 'white',
        fontFamily: fonts.main
    },
    text: {
        fontFamily: fonts.main
    }
})
