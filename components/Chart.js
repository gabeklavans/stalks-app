import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts'
import { G, Text, Circle } from 'react-native-svg'
import LineShadow from './LineShadow';
import Colors from '../assets/Colors';

const Chart = ({ prices }) => {

    const axesSvg = { fontSize: 10, fill: 'black', };
    const verticalContentInset = { top: 30, bottom: 10 }
    const xAxisHeight = 30

    const xAxis = ['Su', 'M', 'M', 'T', 'T', 'W', 'W', 'Th', 'Th', 'F', 'F', 'S', 'S'];

    const Title = ({ width }) => {
        return (
            <G>
                <Text
                    x={width/2 - 10}
                    y={5}
                    fill={'black'}
                    textAnchor={'middle'}
                    alignmentBaseline={'central'}
                    fontSize={14}
                    fontWeight='bold' >
                    Potential Prices for the Week
                </Text>
            </G>

        )
    }

    const Labels = ({ data, height }) => {
        return data.map((line, index) => {
            const strokeColor = line.svg.stroke;
            const labelPosY = 15;
            const labelPosX = index * 80;
            return (
                <G key={index}>
                    {/* <Circle
                        key={index + (Math.pow(10, 2))}
                        cx={55}
                        cy={labelPosY}
                        r={5}
                        fill={data.svg.fill}
                        stroke='black'
                        strokeWidth={1} /> */}
                    <Text
                        key={index}
                        x={labelPosX}
                        y={labelPosY}
                        fill={'black'}
                        textAnchor={'start'}
                        alignmentBaseline={'central'}
                        fontSize={12} >
                        {strokeColor}
                    </Text>
                </G>

            )
        })
    }

    const data = []

    const labelMap = [
        { label: 'Fluctuating', color: Colors.patternColors[0], strokeWidth: 5 },
        { label: 'Big Spike', color: Colors.patternColors[1], strokeWidth: 4 },
        { label: 'Decreasing', color: Colors.patternColors[2], strokeWidth: 3 },
        { label: 'Small Spike', color: Colors.patternColors[3], strokeWidth: 2 },
        { label: 'Guaranteed Minimum', color: 'black', strokeWidth: 1}
    ]

    for (let i = 0; i < prices.length; i++) {
        if (prices[i]) {
            data.push({
                data: prices[i],
                svg: { stroke: labelMap[i].color, strokeWidth: labelMap[i].strokeWidth },
                label: labelMap[i].label
            });
        }
    }

    const flattenedData = [];

    for (const pattern of data) {
        // console.log(pattern.data)
        for (const item of pattern.data) {
            flattenedData.push(item)
        }
    }
    // console.log(flattenedData)

    return (
        <View style={{ height: Dimensions.get('screen').height * 0.48, padding: 20, flexDirection: 'row' }}>
            <YAxis
                data={flattenedData}
                style={{ marginBottom: xAxisHeight }}
                contentInset={verticalContentInset}
                svg={axesSvg}
            />
            <View style={{ flex: 1, marginLeft: 5 }}>
                <LineChart
                    style={{ flex: 1 }}
                    data={data}
                    svg={{ stroke: 'rgb(134, 65, 244)' }}
                    contentInset={verticalContentInset} >
                    <Grid />
                    {/* <LineShadow num={0} color='rgba(134, 65, 244, 0.2)' />
                    <LineShadow num={1} color='rgba(134, 65, 244, 0.2)' /> */}
                    <Title />
                    {/* <Labels /> */}
                </LineChart>
                <XAxis
                    style={{ marginHorizontal: -10, height: xAxisHeight }}
                    data={new Array(13).fill(0)}
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
