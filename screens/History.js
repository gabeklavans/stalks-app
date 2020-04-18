import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View, TextInput, FlatList, AsyncStorage, Alert, TouchableWithoutFeedback } from 'react-native'
import { Container, Content, Button } from 'native-base'

const History = () => {
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

    console.log(priceData)

    return (
        <View>
            {/* <Button onPress={retrievePriceHistory()}>
                <Text>Get data</Text>
            </Button> */}
            <TouchableWithoutFeedback onPress={retrievePriceHistory()}>
                <FlatList data={priceData} renderItem={itemData => (
                    <Text>{itemData.item.value}</Text>
                )} />
            </TouchableWithoutFeedback>

        </View>
    )
}

export default History

const styles = StyleSheet.create({})
