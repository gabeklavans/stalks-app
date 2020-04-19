import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import {PriceContext} from './components/PriceContext';
import TabNavigator from './routes/TabNavigator'

export default function App() {
    const pricesInit = new Array(7).fill(new Array(2));
    const [prices, setPrices] = useState(pricesInit);

    return (
        <NavigationContainer>
            <PriceContext.Provider value={[prices, setPrices]}>
                <TabNavigator />
            </PriceContext.Provider>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});


