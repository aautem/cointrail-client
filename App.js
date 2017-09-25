import React from 'react';
import { StyleSheet, View } from 'react-native';
import NavContainer from './src/components/nav-container';
import MainMenuContainer from './src/components/main-menu-container';
import GameOptionsModal from './src/components/game-options-modal';
import GameContainer from './src/components/game-container';
// import Auth0 from 'react-native-auth0';

// GAME OPTIONS SUPPORT:
// [X] Board size (4x4, 5x5, 6x6)
// [ ] Series length (Best of 3 [w2], Best of 7 [w4], Best of 11 [w6])
// [ ] Time Limit (15, 30, Off)

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: 'aautem',
      gameInProgress: false,
      stats: null,
      gameOptionsModalVisible: false,
      boardSize: null,
      seriesLength: null,
      timeLimit: null,
    };

    this.openGameOptionsModal = this.openGameOptionsModal.bind(this);
    this.closeGameOptionsModal = this.closeGameOptionsModal.bind(this);
    this.startGame = this.startGame.bind(this);
    this.quitGame = this.quitGame.bind(this);
  }

  componentWillMount() {
    // const auth0 = new Auth0({ domain: 'aautem.auth0.com', clientId: 'CXuCytj2Wgf5Om6M2sEfB80001Vd5N9j' });
    // auth0
    //   .webAuth
    //   .authorize({scope: 'openid email', audience: 'https://aautem.auth0.com/userinfo'})
    //   .then((credentials) => {
    //     console.log(credentials);
    //     // Successfully authenticated
    //     // Store the accessToken
    //   }).catch((error) => {
    //     console.log(error);
    //   });
  }

  openGameOptionsModal() {
    this.setState((state) => {
      state.gameOptionsModalVisible = true;
      return state;
    });
  }

  closeGameOptionsModal() {
    this.setState((state) => {
      state.gameOptionsModalVisible = false;
      return state;
    });
  }

  startGame(boardSize, seriesLength, timeLimit) {
    this.setState((state) => {
      state.boardSize = boardSize;
      state.seriesLength = seriesLength;
      state.timeLimit = timeLimit;
      state.gameOptionsModalVisible = false;
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
        <GameOptionsModal
          visible={this.state.gameOptionsModalVisible}
          closeGameOptionsModal={this.closeGameOptionsModal}
          startGame={this.startGame}
        />
        <NavContainer quitGame={this.quitGame} />
        {!this.state.gameInProgress &&
        <MainMenuContainer openGameOptionsModal={this.openGameOptionsModal} />}
        {this.state.gameInProgress &&
        <GameContainer
          size={this.state.boardSize}
          series={this.state.seriesLength}
          time={this.state.timeLimit}
          theme={'default'}
        />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});
