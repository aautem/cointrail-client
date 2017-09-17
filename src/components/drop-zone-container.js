import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Coin from './coin';

export default class DropZoneContainer extends React.Component {
  render() {
    return (
      <View style={styles.rowContainer}>
        <Coin color='black' />
        <Coin color='black' />
        <Coin color='black' />
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