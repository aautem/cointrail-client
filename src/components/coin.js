import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Coin extends React.Component {
  render() {
    return (
      <View style={[styles.coin, { backgroundColor: this.props.color }]}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  coin: {
    flex: 1,
    backgroundColor: 'grey',
    borderRadius: 100,
    margin: '5%',
  },
});