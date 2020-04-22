import React, { useContext } from 'react'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

import HomeStack from './HomeStack'
import AboutStack from '../routes/AboutStack';
import { fonts } from '../assets/Fonts';
import Colors from '../assets/Colors';
import { View, Alert, AsyncStorage } from 'react-native';

import { PriceContext, FirstBuyContext, PatternContext } from '../components/GlobalContext';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
    const [prices, setPrices] = useContext(PriceContext);
    const [firstBuy, setFirstBuy] = useContext(FirstBuyContext);
    const [pattern, setPattern] = useContext(PatternContext);

    const resetAllVals = async () => {
        setPrices(new Array(7).fill(new Array(2)))
        setFirstBuy(false)
        setPattern(-1)

        try {
            await AsyncStorage.multiSet([
                ['priceData', JSON.stringify(new Array(7).fill(new Array(2)))],
                ['lastPattern', '-1'],
                ['firstBuy', 'false']
            ])
        } catch {
            console.error(`Error resetting input data from storage`)
        }
    }

    const resetButtonHandler = () => {
        Alert.alert('Confirm', 'Are you sure you want to clear all the current inputs?', [{ text: 'Clear them', style: 'destructive', onPress: resetAllVals }, { text: 'Nevermind...' }])
    }

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, justifyContent: 'space-between', backgroundColor: Colors.appBackground }} >
            <View>
                <DrawerItemList {...props} labelStyle={navStyles.text} />
            </View>
            <View>
                <DrawerItem
                    label='Reset Inputs'
                    labelStyle={{ color: Colors.confirmButton, ...navStyles.text }}
                    style={{ position: 'absolute', bottom: 0 }}
                    onPress={resetButtonHandler} />
            </View>
        </DrawerContentScrollView>
    )
}

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />} initialRouteName='Home' >
            <Drawer.Screen name="Home" component={HomeStack} />
            {/* <Drawer.Screen name="History (Coming Soon!)" component={History} /> */}
            <Drawer.Screen name='About' component={AboutStack} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;

const navStyles = {
    text: {
        fontFamily: fonts.main,
        fontSize: 18
    }
}