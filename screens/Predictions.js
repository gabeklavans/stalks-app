import React, { useState, useCallback } from 'react'
import { StyleSheet, View, Dimensions, InteractionManager, Image } from 'react-native'
import { Text, Switch } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Loader from '../components/Loader'
import predict from '../scripts/predictions'
import { getPatternProbabilities } from '../scripts/getPatternProbabilities'
import Chart from '../components/Chart';
import PatternChart from '../components/PatternChart';
import Colors from '../assets/Colors';
import { fonts } from '../assets/Fonts';
import { getMinMaxPrices } from '../scripts/getMaxPrices';


const Settings = ({ navigation, route }) => {
    const { prices, pattern, firstBuy } = route.params

    const [categroyProbabilities, setCategoryProbabilities] = useState([])

    const [isLoading, setIsLoading] = useState(true);
    const [emptyChart, setEmptyChart] = useState(null);
    const [priceLines, setPriceLines] = useState([]);
    const [showMinLines, setShowMinLines] = useState(true);

    useFocusEffect(
        useCallback(() => {
            const task = InteractionManager.runAfterInteractions(() => {
                buttonPressHandler();
            });

            return () => task.cancel();

        }, [prices])
    )

    const buttonPressHandler = () => {
        let vals = prices.flat().map(string => parseInt(string));

        if (vals.every(val => isNaN(val)) && !firstBuy) {
            // console.log('No vals in here!')
            setEmptyChart(true);
        } else {
            let possibilities = predict(vals, firstBuy, pattern);

            let catProbs = getPatternProbabilities(possibilities);
            setCategoryProbabilities(catProbs);

            let [priceMins, priceMaxes] = getMinMaxPrices(possibilities);
            // priceMaxes.push(possibilities[0].prices.slice(1).map(day => day.min));
            setPriceLines([priceMins, priceMaxes])
            // console.log(priceMaxes);

            setEmptyChart(false);
        }

        setIsLoading(false);
    }

    let predictionContent;

    if (emptyChart === null) {
        predictionContent = <Ionicons name='ios-hourglass' size={30} />
    } else if (!emptyChart) {
        predictionContent = (
            <View>
                <View style={{width: '60%', flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'center', marginTop: 10, marginBottom: 5}}>
                    <Text style={{...styles.text, fontSize: 14}}>Show Minimum Prices</Text>
                    <Switch onValueChange={setShowMinLines} value={showMinLines} />
                </View>
                <Chart maxLines={priceLines[1]} minLines={priceLines[0]} showMinLines={showMinLines} />
                <PatternChart probabilities={categroyProbabilities} />
            </View>
        )
    } else {
        predictionContent = <Text style={styles.text}>No data to display!</Text>
    }

    return (
            <View style={styles.screen}  >
                <Loader isLoading={isLoading} />
                {predictionContent}
                <Image
                    source={require('../assets/TurnipFooter.png')}
                    style={{
                        width: Dimensions.get('screen').width,
                        position: 'absolute',
                        bottom: Dimensions.get('screen').height * -0.08,
                        resizeMode: 'cover',
                        height: Dimensions.get('screen').width * (Dimensions.get('screen').width / Dimensions.get('screen').height),
                        opacity: 0.5
                    }}
                />
            </View>
    );
}

export default Settings

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 5,
        justifyContent: 'flex-start',
        alignContent: 'center',
        backgroundColor: Colors.appBackground
    },
    text: {
        fontFamily: fonts.main
    },
    bottom: {
        width: Dimensions.get('screen').width,
        height: 100,
        borderWidth: 1,
        position: 'absolute',
        bottom: 0
    }
})
