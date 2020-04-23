/* WIP File, probably has really old and bad methods of doing things */

import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View, TextInput, FlatList, AsyncStorage, Alert, TouchableWithoutFeedback } from 'react-native'
import { Container, Content, Button, Header } from 'native-base'
import { fonts } from '../assets/Fonts';
import Colors from '../assets/Colors';

const History = ({ route }) => {
    const [priceData, setPriceData] = useState([]);

    const retrievePriceHistory = async () => {
        try {
            let fromStorage = await AsyncStorage.getItem('priceHistory');

            if (fromStorage !== null) {
                setPriceData(JSON.parse(fromStorage));
            } else {
                setPriceData([{ key: Math.random.toString(), value: 'There is nothing in your history yet!' }]);
            }
        } catch (error) {
            Alert.alert('Error!', `Couldn't retrieve data`, [{ text: 'Aw ok', style: 'destructive' }])
            setPriceData([{ key: Math.random.toString(), value: 'Error' }]);
        }
    }

    const returnPriceHistory = async () => {
        try {
            let fromStorage = await AsyncStorage.getItem('priceHistory');

            if (fromStorage !== null) {
                return JSON.parse(fromStorage);
            } else {
                return [{ key: Math.random.toString(), value: 'There is nothing in your history yet!' }];
            }
        } catch (error) {
            Alert.alert('Error!', `Couldn't retrieve data`, [{ text: 'Aw ok', style: 'destructive' }])
            return [{ key: Math.random.toString(), value: 'Error' }];
        }
    }

    // retrievePriceHistory();

    // if (route.params.navigatedTo) {
    //     retrievePriceHistory();
    //     route.params.navigatedTo = false;
    // }

    return (
        <Container>
            <Header style={{backgroundColor: Colors.iconBackground}}></Header>
            {/* <Button onPress={retrievePriceHistory}>
                <Text>Get data</Text>
            </Button>
                <FlatList data={priceData} renderItem={itemData => (
                    <Text>{itemData.item.value}</Text>
                )} /> */}
            <Content style={{backgroundColor: Colors.appBackground, padding: 10}}>
                <Text style={styles.text}>Nothing here yet!</Text>
            </Content>


        </Container>
    )
}

export default History

const styles = StyleSheet.create({
    text: {
        fontFamily: fonts.main
    }
})
