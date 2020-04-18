import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Button, Text, Content } from 'native-base';

const Home = ({ navigation }) => {
    return (
        <Container style={{alignItems: 'center'}}>
            <Content>
                <Text>Home screen</Text>
                <Button bordered small block primary onPress={() => navigation.navigate('History')}>
                    <Text>Go to History</Text>
                </Button>
            </Content>
        </Container>
    )
}

export default Home

const styles = StyleSheet.create({})
