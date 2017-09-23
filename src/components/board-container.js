import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DropZoneContainer from './drop-zone-container';
import RowContainer from './row-container';

// board: Gameboard
// boardPoints: Gameboard Points
// dropCoin: method

export default class BoardContainer extends React.Component {
  render() {
    return (
      <View style={styles.boardContainer}>
        <DropZoneContainer board={this.props.board} dropCoin={this.props.dropCoin} />
        {this.props.board.map((row, index) => {
          return (
            <RowContainer key={`row-${index}`} row={row} rowPoints={this.props.boardPoints[index]} />
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boardContainer: {
    flex: 8,
    paddingLeft: '3%',
    paddingRight: '3%',
    paddingBottom: '5%',
    backgroundColor: 'steelblue',
  },
});