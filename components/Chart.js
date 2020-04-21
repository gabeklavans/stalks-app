import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { Grid, LineChart, XAxis, YAxis, Path } from 'react-native-svg-charts'
import { G, Text, Circle } from 'react-native-svg'
import LineShadow from './LineShadow';

const Chart = ({ data }) => {

    const axesSvg = { fontSize: 10, fill: 'black', };
    const verticalContentInset = { top: 30, bottom: 10 }
    const xAxisHeight = 30

    const xAxis = ['Su', 'M', 'M', 'T', 'T', 'W', 'W', 'Th', 'Th', 'F', 'F', 'S', 'S'];

    const Title = ({ width }) => {
        return (
            <G>
                <Text
                    x={width/2}
                    y={5}
                    fill={'black'}
                    textAnchor={'middle'}
                    alignmentBaseline={'central'}
                    fontSize={12} >
                    Ttile
                </Text>
            </G>

        )
    }

    const Labels = ({ data, height }) => {
        return data.map((line, index) => {
            const strokeColor = line.svg.stroke;
            // console.log(strokeColor)
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

    return (
        <View style={{ height: Dimensions.get('screen').height * 0.4, padding: 20, flexDirection: 'row' }}>
            <YAxis
                data={[...data[0].data, ...data[1].data]}
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
                    <LineShadow num={0} color='rgba(134, 65, 244, 0.2)' />
                    <LineShadow num={1} color='rgba(134, 65, 244, 0.2)' />
                    <Title />
                    <Labels />
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
