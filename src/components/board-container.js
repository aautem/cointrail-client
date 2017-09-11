import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RowContainer from './row-container';

export default class BoardContainer extends React.Component {
  render() {
    return (
      <View style={styles.boardContainer}>
        <RowContainer />
        <RowContainer />
        <RowContainer />
        <RowContainer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boardContainer: {
    flex: 7,
    backgroundColor: 'steelblue',
  },
});