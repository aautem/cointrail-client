import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DropZoneContainer from './drop-zone-container';
import RowContainer from './row-container';

export default class BoardContainer extends React.Component {
  render() {    
    return (
      <View style={styles.boardContainer}>
        <DropZoneContainer dropCoin={this.props.dropCoin} />
        <RowContainer row={this.props.board[0]} />
        <RowContainer row={this.props.board[1]} />
        <RowContainer row={this.props.board[2]} />
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