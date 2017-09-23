import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Coin from './coin';

// key: React string
// row: Gameboard Row

export default class RowContainer extends React.Component {
  render() {
    return (
      <View style={styles.rowContainer}>
        {this.props.row.map((player, index) => {
          return (
            <Coin key={`col-${index}`} player={player} />
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
  },
});