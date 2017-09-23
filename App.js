import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Game from './src/components/game-container';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'aautem',
      gameInProgress: false,
      stats: null,
    };
  }

  render() {
    return (
      <View style={styles.appContainer}>
        <Game size={4} theme={'default'} series={3} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});
