import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavContainer from './src/components/nav-container';
import BoardContainer from './src/components/board-container';
import GutterContainer from './src/components/gutter-container';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      game: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      turn: 1, // p1 or p2
      winner: null // null, 1, 2
    };

    this.dropCoin = this.dropCoin.bind(this);
    this.checkForWinner = this.checkForWinner.bind(this);
    this.checkRows = this.checkRows.bind(this);
    this.checkColumns = this.checkColumns.bind(this);
    this.checkDiagonals = this.checkDiagonals.bind(this);
    this.switchTurn = this.switchTurn.bind(this);
  }

  dropCoin(column) {
    // drop a coin

    this.checkForWinner();
    this.switchTurn();
  }

  checkForWinner() {
    // null / 1 / 2
  }

  checkRows() {
    // check each row
  }

  checkColumns() {
    // check each column
  }

  checkDiagonals() {
    // check diagonals
  }

  switchTurn() {
    this.setState((state) => {
      state.turn = state.turn === 1 ? 2 : 1;
      return state;
    });
  }

  render() {
    return (
      <View style={styles.appContainer}>
        <NavContainer />
        <BoardContainer
          board={this.state.board}
          dropCoin={this.dropCoin}
        />
        <GutterContainer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});
