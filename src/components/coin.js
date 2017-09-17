import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
      <View style={[styles.coin, { backgroundColor: styles[color] }]} />
    );
  }
}

const styles = StyleSheet.create({
  coin: {
    flex: 1,
    borderRadius: 100,
    margin: '5%',
  },
  player1: {
    color: 'blue',
  },
  player2: {
    color: 'red',
  },
  empty: {
    color: 'white',
  },
});