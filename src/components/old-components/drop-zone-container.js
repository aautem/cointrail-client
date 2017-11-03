import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DropButton from './drop-button';

// board: Gameboard
// dropCoin: method

export default class DropZoneContainer extends React.Component {
  render() {
    return (
      <View style={styles.rowContainer}>
        {this.props.board.map((row, index) => {
          return (
            <DropButton key={`drop-btn-${index}`} column={index} dropCoin={this.props.dropCoin} />
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: '2%',
  },
});