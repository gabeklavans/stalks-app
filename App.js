import React, { useState } from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from '@use-expo/font';

import { PriceContext, FirstBuyContext, PatternContext } from './components/GlobalContext';
import DrawerNavigator from './routes/DrawerNavigator'
import { AppLoading } from 'expo';

export default function App() {
    const pricesInit = new Array(7).fill(new Array(2));
    const [prices, setPrices] = useState(pricesInit);
    const [firstBuy, setFirstBuy] = useState(false);
    const [pattern, setPattern] = useState(-1);
    
    const [fontIsLoaded] = useFonts({
        'Arial-Round': require('./assets/fonts/unicode.arialr.ttf'),
        'Arial-Round-Bold': require('./assets/fonts/arlrdbd.ttf')
    })

    const [dataIsLoaded, setDataIsLoaded] = useState(false);

    const retrieveInputsFromStorage = async () => {
        try {
            let data = await AsyncStorage.getItem('priceData');

            if (data) {
                data = JSON.parse(data)
                setPrices(data)
            }

            // Expects last pattern to be string of an int
            let lastPattern = await AsyncStorage.getItem('lastPattern')
            
            if (lastPattern) {
                setPattern(parseInt(lastPattern))
            }
        } catch {
            console.error('Error retrieve data')
        } finally {
            setDataIsLoaded(true);
        }
    }

    if (!dataIsLoaded) {
        retrieveInputsFromStorage();
    }

    if (!fontIsLoaded || !dataIsLoaded) {
        return <AppLoading />;
    } else {
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});


