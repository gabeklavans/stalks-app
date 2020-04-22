import React from 'react'
import { PieChart } from 'react-native-svg-charts'
import { G, Text, Circle } from 'react-native-svg'
import { Button, View } from 'react-native'
import Colors from '../assets/Colors'

const PatternChart = ({ probabilities }) => {

    const Title = ({ height }) => {
        return (
            <G>
                <Text
                    x={0}
                    y={-54}
                    fill={'black'}
                    textAnchor={'middle'}
                    alignmentBaseline={'central'}
                    fontSize={14}
                    fontWeight='bold' >
                    Chance of Each Pattern
                </Text>
            </G>

        )
    }

    const labelMap = [
        { label: 'Fluctuating', color: Colors.patternColors[0] },
        { label: 'Big Spike', color: Colors.patternColors[1] },
        { label: 'Decreasing', color: Colors.patternColors[2] },
        { label: 'Small Spike', color: Colors.patternColors[3] }
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
            // console.log(slice)

            let labelPosX;
            let labelPosY;

            let circlePosX;
            if (index > 1 ) {
                labelPosY = ((index -2) * -36) + 18;
                labelPosX = -165;
                circlePosX = -50;
            } else {
                labelPosY = ((index ) * 36) - 18;
                labelPosX = 62;
                circlePosX = 50;
            }

            return (
                <G key={index}>
                    <Circle
                        key={index + (Math.pow(10, 2))}
                        cx={circlePosX}
                        cy={labelPosY}
                        r={5}
                        fill={data.svg.fill}
                        stroke='black'
                        strokeWidth={1} />
                    <Text
                        key={index}
                        x={labelPosX}
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
        <PieChart
            style={{ height: 120 }}
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
    )
}

export default PatternChart
