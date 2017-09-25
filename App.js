import React from 'react';
import { StyleSheet, View } from 'react-native';
import NavContainer from './src/components/nav-container';
import MainMenuContainer from './src/components/main-menu-container';
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
    };

    this.startNewGame = this.startNewGame.bind(this);
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
