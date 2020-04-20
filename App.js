import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { PriceContext, FirstBuyContext, PatternContext } from './components/GlobalContext';
import TabNavigator from './routes/TabNavigator'
import DrawerNavigator from './routes/DrawerNavigator'

export default function App() {
    const pricesInit = new Array(7).fill(new Array(2));
    const [prices, setPrices] = useState(pricesInit);
    const [firstBuy, setFirstBuy] = useState(false);
    const [pattern, setPattern] = useState(-1);

    return (
        <NavigationContainer>
            <PatternContext.Provider value={[pattern, setPattern]}>
                <FirstBuyContext.Provider value={[firstBuy, setFirstBuy]}>
                    <PriceContext.Provider value={[prices, setPrices]}>
                        <DrawerNavigator />
                    </PriceContext.Provider>
                </FirstBuyContext.Provider>
            </PatternContext.Provider>
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


