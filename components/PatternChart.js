import React from 'react'
import { PieChart } from 'react-native-svg-charts'
import { G, Line, Text } from 'react-native-svg'
import { Rect } from 'react-native-svg'
import { Circle } from 'react-native-svg'

const PatternChart = ({ probabilities }) => {

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

    const data2 = [
        {
            key: 0,
            amount: probabilities[0],
            svg: { fill: 'orange' },
            label: 'Fluctuating'
        },
        {
            key: 1,
            amount: 1,
            svg: { fill: 'yellow' },
            label: 'Big Spike'
        },
        {
            key: 2,
            amount: 10,
            svg: { fill: 'green' },
            label: 'Decreasing'
        },
        {
            key: 3,
            amount: 87,
            svg: { fill: 'violet' },
            label: 'Small Spike'
        },
    ]

    const Labels = ({ slices }) => {
        return slices.map((slice, index) => {
            const { labelCentroid, pieCentroid, data } = slice;
            // console.log(slice)
            const labelWidth = 105;
            const labelHeight = 22;
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
        <PieChart
            style={{ height: 100 }}
            svg={{ translateX: 30 }}
            valueAccessor={({ item }) => item.amount}
            data={data}
            innerRadius={10}
            outerRadius={40}
            labelRadius={100}
        >
            <Labels />
        </PieChart>
    )
}

export default PatternChart
