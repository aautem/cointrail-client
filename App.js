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
      boardPoints: this.getboardPoints(4),
      turn: 1, // p1 or p2
      winner: null, // null, 1, 2
      size: 4, // board size
      player1Score: 0,
      player2Score: 0,
    };

    this.dropCoin = this.dropCoin.bind(this);
  }

  // TODO: combine build and get board points into single init function
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

  // TODO: make work for any board size
  getboardPoints(size) {
    // 10: 8 // 25: 4 // 50: 2 // 100: 1 // 150: 1
    let pointValues = [10, 25, 50, 100, 150];
    let valuesLeft = [8, 4, 2, 1, 1];
    let boardPoints = [];
    for (let row = 0; row < size; row ++) {
      boardPoints[row] = [];
      for (let col = 0; col < size; col ++) {
        const index = Math.floor(Math.random() * pointValues.length);
        boardPoints[row].push(pointValues[index]);
        valuesLeft[index] --;
        if (!valuesLeft[index]) {
          pointValues = pointValues.slice(0, index).concat(pointValues.slice(index + 1));
          valuesLeft = valuesLeft.slice(0, index).concat(valuesLeft.slice(index + 1));
        }
      }
    }
    return boardPoints;
  }

  dropCoin(col) {
    const row = this.checkForEmptyRow(col);
    if (typeof row === 'number') {
      this.collectPoints(row, col);
      const updatedBoard = this.addCoin(row, col);
      setTimeout(() => {
        this.checkForWinner(updatedBoard);
        this.switchTurn();
      }, 0);
    } else {
      alert('No empty spaces, try another column.');
    }
  }

  collectPoints(row, col) {
    const points = this.state.boardPoints[row][col];
    const playerScoreKey = `player${this.state.turn}Score`;
    this.setState((state) => {
      state[playerScoreKey] = state[playerScoreKey] += points;
      return state;
    });
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
        alert(`.~::  C O N T R A I L  ::~.`);
        this.resetScoreboard();
        this.resetGameboard();
      }, 500);
    }
    if (this.checkForTie(board)) {
      let winningPlayer = this.getWinnerByPoints();
      let firstScore = winningPlayer === 1 ? this.state.player1Score : this.state.player2Score;
      let secondScore = winningPlayer === 1 ? this.state.player2Score : this.state.player1Score;
      setTimeout(() => {
        alert(`Player ${winningPlayer} (${firstScore} - ${secondScore})`);
        this.resetScoreboard();
        this.resetGameboard();
      }, 500);
    }
  }

  getWinnerByPoints() {
    return this.state.player1Score >= this.state.player2Score ? 1 : 2;
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

  resetScoreboard() {
    this.setState((state) => {
      state.player1Score = 0;
      state.player2Score = 0;
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
          boardPoints={this.state.boardPoints}
          dropCoin={this.dropCoin}
        />
        <GutterContainer player1Score={this.state.player1Score} player2Score={this.state.player2Score} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});
