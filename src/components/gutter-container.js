import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScoreboardContainer from './scoreboard-container';
import CoinStashContainer from './coin-stash-container';

export default class GutterContainer extends React.Component {
  render() {
    return (
      <View style={styles.gutterContainer}>
        <ScoreboardContainer player1Score={this.props.player1Score} player2Score={this.props.player2Score} />
        <CoinStashContainer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gutterContainer: {
    flex: 1.5,
    backgroundColor: 'white',
  },
});