import React, { useState } from 'react'
import { StyleSheet, View, Dimensions, SafeAreaView } from 'react-native'
import { Container, Content, Button, Text } from 'native-base';
import { LineChart, Grid } from 'react-native-svg-charts'

import predict from '../scripts/predictions'

const Settings = () => {
    const [dayMin, setDayMin] = useState([50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]);
    const [dayMax, setDayMax] = useState([10, 23, 22, 100, -10, 0, 0, 0, 0, 0, -10, 0, 0, -3, -51]);

    const buttonPressHandler = () => {
        const nanArray = new Array(12).fill(NaN);
        // console.log(nanArray)
        const possibilities = predict([90, 90, ...nanArray], false, 0);
        setDayMin(possibilities[0].prices.slice(1).map(day => day.min));
        setDayMax(possibilities[0].prices.slice(1).map(day => day.max));
    }

    const data = [
        {
            data: dayMin,
            svg: { stroke: '#8800cc' },
        },
        {
            data: dayMax,
            svg: { stroke: 'green' },
        },
    ]


    return (
        <Container>
            <Content contentContainerStyle={{ padding: 50 }}>
                <Button onPress={buttonPressHandler}>
                    <Text>
                        Get some predictions
                    </Text>
                </Button>
                <LineChart
                    style={{ height: 200 }}
                    data={data}
                    svg={{ stroke: 'rgb(134, 65, 244)' }}
                    contentInset={{ top: 20, bottom: 20 }}
                >
                    <Grid />
                </LineChart>

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
