import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts'
import { G, Text } from 'react-native-svg'
import Colors from '../assets/Colors';

const Chart = ({ maxLines, minLines, showMinLines }) => {

    const axesSvg = { fontSize: 10, fill: 'black', };
    const verticalContentInset = { top: 30, bottom: 10 }
    const xAxisHeight = 30

    const xAxis = ['Su', 'M', 'M', 'T', 'T', 'W', 'W', 'Th', 'Th', 'F', 'F', 'S', 'S'];

    const Title = ({ width }) => {
        return (
            <G >
                <Text
                    x={width / 2 - 10}
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

    // const Labels = ({ data }) => {
    //     console.log(data)
    //     // return data.map((line, index) => {
    //         // const strokeColor = line.svg.stroke;
    //         // const labelPosY = 15;
    //         // const labelPosX = index * 80;
    //         return (
    //             <G key={index} >
    //                 <Circle
    //                     key={index + (Math.pow(10, 2))}
    //                     cx={55}
    //                     cy={labelPosY}
    //                     r={5}
    //                     fill={data.svg.fill}
    //                     stroke='black'
    //                     strokeWidth={1} />
    //                 <Text
    //                     key={index}
    //                     x={labelPosX}
    //                     y={labelPosY}
    //                     fill={'black'}
    //                     textAnchor={'start'}
    //                     alignmentBaseline={'central'}
    //                     fontSize={12} >
    //                     {strokeColor}
    //                 </Text>
    //             </G>
    //         )
    //     // })
    // }

    const data = []

    const labelMap = [
        { label: 'Fluctuating', color: Colors.patternColors[0], strokeWidth: 5 },
        { label: 'Big Spike', color: Colors.patternColors[1], strokeWidth: 4 },
        { label: 'Decreasing', color: Colors.patternColors[2], strokeWidth: 3 },
        { label: 'Small Spike', color: Colors.patternColors[3], strokeWidth: 2 },
        { label: 'Fluc. Min', color: Colors.patternColors[0], strokeWidth: 5 },
        { label: 'B. Sp. Min', color: Colors.patternColors[1], strokeWidth: 4 },
        { label: 'Dec. Min', color: Colors.patternColors[2], strokeWidth: 3 },
        { label: 'S. Sp. Min', color: Colors.patternColors[3], strokeWidth: 2 },
        { label: 'Guaranteed Minimum', color: 'black', strokeWidth: 1 }
    ]

    for (let i = 0; i < maxLines.length; i++) {
        if (maxLines[i]) {
            data.push({
                data: maxLines[i],
                svg: { stroke: labelMap[i].color, strokeWidth: labelMap[i].strokeWidth },
                label: labelMap[i].label
            });
            if (showMinLines) {
                data.push({
                    data: minLines[i],
                    svg: { stroke: labelMap[i + 4].color, strokeWidth: labelMap[i + 4].strokeWidth },
                    label: labelMap[i + 4].label
                });
            }
        }
    }

    const flattenedData = [];

    for (const pattern of data) {
        for (const item of pattern.data) {
            flattenedData.push(item)
        }
    }

    return (
        <View style={{ height: Dimensions.get('screen').height * 0.45, padding: 10, flexDirection: 'row' }}>
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
                        y: 3,
                    }}
                 />
            </View>
        </View>
    )
}

export default Chart

const styles = StyleSheet.create({})
