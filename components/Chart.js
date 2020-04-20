import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { Grid, LineChart, XAxis, YAxis, Path } from 'react-native-svg-charts'
import LineShadow from './LineShadow';

const Chart = ({ data }) => {

    const axesSvg = { fontSize: 10, fill: 'black', };
    const verticalContentInset = { top: 10, bottom: 10 }
    const xAxisHeight = 30

    const xAxis = ['S', 'M', 'M', 'T', 'T', 'W', 'W', 'Th', 'Th', 'F', 'F', 'S', 'S'];

    // console.log(data[1].data);

    return (
        <View style={{ height: Dimensions.get('screen').height * 0.38, padding: 20, flexDirection: 'row' }}>
            <YAxis
                data={[...data[0].data, ...data[1].data]}
                style={{ marginBottom: xAxisHeight }}
                contentInset={verticalContentInset}
                svg={axesSvg}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
                <LineChart
                    style={{ flex: 1 }}
                    data={data}
                    svg={{ stroke: 'rgb(134, 65, 244)' }}
                    contentInset={verticalContentInset} >
                    <Grid />
                    <LineShadow num={0} color='rgba(134, 65, 244, 0.2)' />
                    <LineShadow num={1} color='rgba(134, 65, 244, 0.2)' />
                </LineChart>
                <XAxis
                    style={{ marginHorizontal: -10, height: xAxisHeight }}
                    data={data[1].data}
                    formatLabel={(value, index) => xAxis[index]} //+ (index % 2 === 0 ? index === 0 ? '' : '🌑' : '☀️')}
                    contentInset={{ left: 10, right: 10 }}
                    svg={{
                        ...axesSvg,
                        // fontSize: 8,
                        // rotation: 10,
                        y: 3,
                        // stroke: 'blue'
                    }}
                />
            </View>
        </View>
    )
}

export default Chart

const styles = StyleSheet.create({})
