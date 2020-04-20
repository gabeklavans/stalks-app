import React from 'react'
import { PieChart } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'
import { G } from 'react-native-svg'
import { Line } from 'react-native-svg'
import { Circle } from 'react-native-svg'

const PatternChart = () => {
    const data = [
        {
            key: 1,
            amount: 50,
            svg: { fill: 'blue' },
            label: 'Big Spike'
        },
        {
            key: 2,
            amount: 50,
            svg: { fill: 'red' },
            label: 'Small Spike'
        },
        {
            key: 3,
            amount: 40,
            svg: { fill: 'green' },
            label: 'Fluctuating'
        },
        {
            key: 4,
            amount: 95,
            svg: { fill: 'yellow' },
            label: 'Descending'
        },
    ]

    const Labels = ({ slices }) => {
        return slices.map((slice, index) => {
            const { labelCentroid, pieCentroid, data } = slice;
            return (
                <G key={index}>
                    <Line
                        x1={labelCentroid[0]}
                        y1={labelCentroid[1]}
                        x2={pieCentroid[0]}
                        y2={pieCentroid[1]}
                        stroke='black' />
                    <Text
                        key={index + 10}
                        x={labelCentroid[0]}
                        y={labelCentroid[1]}
                        fill={'white'}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        fontSize={12}
                        stroke={'black'}
                        strokeWidth={0.5}
                    >
                        {data.label}
                    </Text>
                    <Text
                        key={index}
                        x={pieCentroid[0]}
                        y={pieCentroid[1]}
                        fill={'white'}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        fontSize={24}
                        stroke={'black'}
                        strokeWidth={0.5}
                    >
                        {data.amount}
                    </Text>
                </G>

            )
        })
    }

    return (
        <PieChart
            style={{ height: 250 }}
            valueAccessor={({ item }) => item.amount}
            data={data}
            spacing={0}
            // outerRadius={'95%'}
            innerRadius={10}
            outerRadius={55}
            labelRadius={100}
        >
            <Labels />
        </PieChart>
    )
}

export default PatternChart
