import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// key: React string
// player: number

export default class Coin extends React.Component {
  getColor() {
    if (this.props.player === 0) {
      return `empty`;
    }
    return `player${this.props.player}`;
  }

  render() {
    const color = this.getColor();

    return (
      <View style={[styles.coin, styles[color]]} />
    );
  }
}

const styles = StyleSheet.create({
  coin: {
    flex: 1,
    borderRadius: 100,
    margin: '3%',
  },
  player1: {
    backgroundColor: 'blue',
  },
  player2: {
    backgroundColor: 'red',
  },
  empty: {
    backgroundColor: 'white',
  },
});