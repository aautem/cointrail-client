import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavContainer from './src/components/nav-container';
import MainMenuContainer from './src/components/main-menu-container';
import GameContainer from './src/components/game-container';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: 'aautem',
      gameInProgress: false,
      stats: null,
    };

    this.startNewGame = this.startNewGame.bind(this);
    this.quitGame = this.quitGame.bind(this);
  }

  startNewGame() {
    this.setState((state) => {
      state.gameInProgress = true;
      return state;
    });
  }

  quitGame() {
    this.setState((state) => {
      state.gameInProgress = false;
      return state;
    });
  }

  render() {
    return (
      <View style={styles.appContainer}>
        <NavContainer quitGame={this.quitGame} />
        {!this.state.gameInProgress &&
        <MainMenuContainer startNewGame={this.startNewGame} />}
        {this.state.gameInProgress &&
        <GameContainer size={4} theme={'default'} series={3} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});
