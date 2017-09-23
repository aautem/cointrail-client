import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavContainer from './src/components/nav-container';
import BoardContainer from './src/components/board-container';
import GutterContainer from './src/components/gutter-container';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      board: this.buildGameboard(4),
      turn: 1, // p1 or p2
      winner: null, // null, 1, 2
      size: 4 // board size
    };

    this.dropCoin = this.dropCoin.bind(this);
  }

  buildGameboard(size) {
    let gameboard = [];
    for (let row = 0; row < size; row ++) {
      gameboard[row] = [];
      for (col = 0; col < size; col ++) {
        gameboard[row][col] = 0;
      }
    }
    return gameboard;
  }

  dropCoin(column) {
    const row = this.checkForEmptyRow(column);
    if (typeof row === 'number') {
      const updatedBoard = this.addCoin(row, column);
      this.checkForWinner(updatedBoard);
      this.switchTurn();
    } else {
      alert('No empty spaces, try another column.');
    }
  }

  checkForEmptyRow(column) {
    let lastRow = this.state.size - 1;
    while(lastRow >= 0) {
      if (this.state.board[lastRow][column] === 0) {
        return lastRow;
      }
      lastRow --;
    }
    return null;
  }

  addCoin(row, column) {
    let board = this.state.board.slice();
    board[row][column] = this.state.turn;
    this.setState((state) => {
      this.state.board = board;
      return state;
    });
    return board;
  }

  getWinPossibilities(board) {
    const rows = this.getBoardRows(board);
    const columns = this.getBoardColumns(board);
    const diagonals = this.getBoardDiagonals(board);
    return [ ...rows, ...columns, ...diagonals];
  }

  checkWinPossibilities(possibilities) {
    let winner = false;
    possibilities.forEach((line) => {
      const winningLine = line.reduce((prevPlayer, player) => {
        if (prevPlayer && player === prevPlayer) {
          return prevPlayer;
        }
        return null;
      });
      if (winningLine) {
        winner = true;
      }
    });
    return winner;
  }

  checkForWinner(board) {
    const winPossibilities = this.getWinPossibilities(board);
    const winner = this.checkWinPossibilities(winPossibilities);
    if (winner) {
      setTimeout(() => {
        alert(`Player ${this.state.turn} wins!`);
        this.resetGameboard();
      }, 500);
    }
    if (this.checkForTie(board)) {
      setTimeout(() => {
        alert(`Tie Game`);
        this.resetGameboard();
      }, 500);
    }
  }

  // TODO: use for loops instead of forEach to return at first zero found (0, 0 most likely to be empty)
  checkForTie(board) {
    let tieGame = true;
    board.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        if (!board[rowIndex][columnIndex]) {
          tieGame = false;
        }
      });
    });
    return tieGame;
  }

  resetGameboard() {
    const newGameboard = this.buildGameboard(this.state.size);
    this.setState((state) => {
      state.board = newGameboard;
      return state;
    });
  }

  getBoardRows(board) {
    let rows = [];
    board.forEach((row) => {
      rows.push(row);
    })
    return rows;
  }

  getBoardColumns(board) {
    let columns = [];
    for (let col = 0; col < this.state.size; col ++) {
      columns[col] = [];
      board.forEach((row) => {
        columns[col].push(row[col]);
      });
    }
    return columns;
  }

  getBoardDiagonals(board) {
    let diagonals = [[], []];
    let columns = this.state.size - 1;
    for (let row = 0; row < this.state.size; row ++) {
      // top right diag: [row, row], [row, row] ...
      diagonals[0].push(board[row][row]);
      // bot left diag: [row, size - 1], [row, size - 2] ...
      diagonals[1].push(board[row][columns --]);
    }
    return diagonals;
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
