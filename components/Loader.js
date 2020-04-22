import React from 'react'
import { StyleSheet, Text, View, Modal, ActivityIndicator } from 'react-native'

const Loader = ({ isLoading }) => {

    const buttonHandler = () => {
        isLoading = false;
    }

    return (
        <Modal
            visible={isLoading}
            animationType='none'
            transparent={true} >
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator animating={isLoading} />
                </View>
            </View>
        </Modal>
    )
}

export default Loader

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
})
