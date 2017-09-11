import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Coin from './coin';

export default class RowContainer extends React.Component {
  render() {
    return (
      <View style={styles.rowContainer}>
        <Coin color='white' />
        <Coin color='white' />
        <Coin color='white' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});