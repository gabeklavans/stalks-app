// Ripped from https://docs.expo.io/versions/latest/workflow/linking/
import React from 'react'
import { Text } from 'react-native';
import { Linking } from 'expo';

export default class Anchor extends React.Component {
  _handlePress = () => {
    Linking.openURL(this.props.href);
    this.props.onPress && this.props.onPress();
  };

  render() {
    return (
      <Text {...this.props} style={{color: 'blue', textDecorationLine: 'underline'}} onPress={this._handlePress}>
        {this.props.children}
      </Text>
    );
  }
}