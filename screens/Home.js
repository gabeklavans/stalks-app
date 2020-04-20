import React, { useState, useContext, useEffect, useLayoutEffect } from 'react'
import { StyleSheet, AsyncStorage, Alert, KeyboardAvoidingView, Dimensions } from 'react-native'
import { Container, Button, Text, Content, Header, Left, Icon, Right, Title, Body, Form, Item, Picker, Input, View, ListItem, CheckBox, Switch, Footer, FooterTab } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

import _ from "lodash";
import { PriceContext, FirstBuyContext, PatternContext } from '../components/GlobalContext';

import DayPriceInput from '../components/DayPriceInput'
import Colors from '../assets/Colors';

const Home = ({ navigation, route }) => {
    const [prices, setPrices] = useContext(PriceContext);
    const [firstBuy, setFirstBuy] = useContext(FirstBuyContext);
    const [pattern, setPattern] = useContext(PatternContext);
    const [firstBuyToggle, setFirstBuyToggle] = useState(false);

    // console.log(route)

    const menuButtonHandler = () => {
        navigation.openDrawer();
    }

    useLayoutEffect(() => {
        navigation.setOptions({
          headerLeft: () => (
          <Button onPress={menuButtonHandler} transparent full style={{justifyContent: 'center'}}><Icon name='ios-menu' style={{fontSize: 30, color: 'white'}}/></Button>
          ),
        });
      }, [navigation]);

    const setPriceHandler = (day, time, price) => {
        setPrices(oldPrices => {
            let newPrices = JSON.parse(JSON.stringify(oldPrices));
            // Sanatize inputs too, to only numbers
            newPrices[day][time] = price.replace(/[^0-9]/g, '');
            return newPrices
        });
    }

    const firstTimeButtonHandler = () => {
        setFirstBuy(!firstBuy);
        setFirstBuyToggle(!firstBuyToggle);
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

    const getPredictionsHandler = () => {
        navigation.navigate('Predictions');
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
                        {/* <Text>First buy on your island?</Text>
                        <View style={{ width: '20%' }}>
                            <Button style={{ backgroundColor: Colors.iconBackground }} block small onPress={firstTimeButtonHandler} >
                                <Text>{firstBuyText}</Text>
                            </Button>
                        </View> */}
                        <Text>First buy on your island?</Text>
                        <Switch onValueChange={firstTimeButtonHandler} value={firstBuyToggle} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text>Last Pattern:</Text>
                        <Form>
                            <Picker
                                iosHeader="Pattern"
                                iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "#007aff", fontSize: 25 }} />}
                                mode='dialog'
                                style={{ width: 150 }}
                                selectedValue={pattern}
                                onValueChange={setPattern}
                                textStyle={{ color: '#007aff' }}
                            >
                                <Picker.Item label="I don't know..." value={-1} />
                                <Picker.Item label='Fluctuating' value={0} />
                                <Picker.Item label='Large Spike' value={1} />
                                <Picker.Item label='Decreasing' value={2} />
                                <Picker.Item label='Small Spike' value={3} />
                            </Picker>
                        </Form>
                    </View>
                </KeyboardAvoidingView>
            </Content>

            <Footer>
                <FooterTab >
                    <Button onPress={getPredictionsHandler} vertical full style={{backgroundColor: 'blue'}}>
                        {/* <Icon name='ios-trending-up' /> */}
                        <Ionicons name='ios-trending-up' size={25} color='white' />
                        <Text style={{color: 'white', fontWeight: 'bold'}}>Get predictions!</Text>
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
    }
})
