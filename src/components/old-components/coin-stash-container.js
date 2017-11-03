import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class CoinStashContainer extends React.Component {
  render() {
    return (
      <View style={styles.coinStashContainer}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  coinStashContainer: {
    flex: 1.5,
    backgroundColor: 'white',
  },
});