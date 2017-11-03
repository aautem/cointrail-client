import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Scoreboard from './scoreboard';

export default class ScoreboardContainer extends React.Component {
  formatScore(score) {
    score = `${score}`;
    if (score.length < 3) {
      score = `0${score}`;
      score = this.formatScore(score);
    }
    return score;
  }

  render() {
    return (
      <View style={styles.scoreboardContainer}>
        <Scoreboard player={1} score={this.formatScore(this.props.player1Score)} />
        <Scoreboard player={2} score={this.formatScore(this.props.player2Score)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scoreboardContainer: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
});
