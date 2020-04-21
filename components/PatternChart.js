import React from 'react'
import { PieChart } from 'react-native-svg-charts'
import { G, Text, Circle } from 'react-native-svg'
import { Button, View } from 'react-native'

const PatternChart = ({ probabilities }) => {

    const Title = ({ height }) => {
        return (
            <G>
                <Text
                    x={0}
                    y={-50}
                    fill={'black'}
                    textAnchor={'middle'}
                    alignmentBaseline={'central'}
                    fontSize={12} >
                    Ttile
                </Text>
            </G>

        )
    }

    const labelMap = [
        { label: 'Fluctuating', color: 'yellow' },
        { label: 'Big Spike', color: 'red' },
        { label: 'Decreasing', color: 'blue' },
        { label: 'Small Spike', color: 'green' }
    ]

    const data = []

    for (let i = 0; i < probabilities.length; i++) {
        if (probabilities[i] > 0) {
            data.push({
                key: i,
                amount: probabilities[i],
                svg: { fill: labelMap[i].color },
                label: labelMap[i].label
            })
        }
    }

    const Labels = ({ slices }) => {
        return slices.map((slice, index) => {
            const { labelCentroid, pieCentroid, data } = slice;
            console.log(slice)
            const labelPosY = (index * 18) - 28;
            return (
                <G key={index}>
                    <Circle
                        key={index + (Math.pow(10, 2))}
                        cx={55}
                        cy={labelPosY}
                        r={5}
                        fill={data.svg.fill}
                        stroke='black'
                        strokeWidth={1} />
                    <Text
                        key={index}
                        x={65}
                        y={labelPosY}
                        fill={'black'}
                        textAnchor={'start'}
                        alignmentBaseline={'central'}
                        fontSize={12}
                        strokeWidth={0.5} >
                        {data.amount + '% ' + data.label}
                    </Text>
                </G>

            )
        })
    }

    return (
        <View style={{}}>
            <PieChart
                style={{ height: 120}}
                svg={{}}
                valueAccessor={({ item }) => item.amount}
                data={data}
                innerRadius={10}
                outerRadius={40}
                labelRadius={100}
            >
                <Title />
                <Labels />
            </PieChart>
            {/* <Button title="Hello" /> */}
        </View>
    )
}

export default PatternChart
