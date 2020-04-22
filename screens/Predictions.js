import React, { useState, useContext, useEffect, useCallback } from 'react'
import { StyleSheet, View, Dimensions, SafeAreaView, Alert, Modal, InteractionManager, Image, ImageBackground } from 'react-native'
import { Button, Container, Content, Text } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { PriceContext, FirstBuyContext, PatternContext } from '../components/GlobalContext';
import Loader from '../components/Loader'
import predict from '../scripts/predictions'
import { getPatternProbabilities } from '../scripts/getPatternProbabilities'
import Chart from '../components/Chart';
import PatternChart from '../components/PatternChart';
import Colors from '../assets/Colors';
import { fonts } from '../assets/Fonts';
import { getMaxPrices } from '../scripts/getMaxPrices';


const Settings = ({ navigation, route }) => {
    const [firstBuy, setFirstBuy] = useContext(FirstBuyContext);
    const [pattern, setPattern] = useContext(PatternContext);
    const [prices, setPrices] = useContext(PriceContext);

    const [dayMin, setDayMin] = useState([50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]);
    const [dayMax, setDayMax] = useState([10, 23, 22, 100, -10, 0, 0, 0, 0, 0, -10, 0, 0, -3, -51]);
    const [categroyProbabilities, setCategoryProbabilities] = useState([])

    const [isLoading, setIsLoading] = useState(true);
    const [emptyChart, setEmptyChart] = useState(null);
    const [priceLines, setPriceLines] = useState([]);



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
            console.log('No vals in here!')
            setEmptyChart(true);
        } else {
            let possibilities = predict(vals, firstBuy, pattern);
            setDayMin(possibilities[0].prices.slice(1).map(day => day.min));
            setDayMax(possibilities[0].prices.slice(1).map(day => day.max));

            let catProbs = getPatternProbabilities(possibilities);
            setCategoryProbabilities(catProbs);

            let priceMaxes = getMaxPrices(possibilities);
            priceMaxes.push(possibilities[0].prices.slice(1).map(day => day.min));
            setPriceLines(priceMaxes)
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
                <Chart prices={priceLines} />
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
                        bottom: 0,
                        resizeMode: 'stretch',
                        height: Dimensions.get('screen').height * .25,
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
