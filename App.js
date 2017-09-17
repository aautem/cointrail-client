import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavContainer from './src/components/nav-container';
import BoardContainer from './src/components/board-container';
import GutterContainer from './src/components/gutter-container';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      board: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      turn: 1, // p1 or p2
      winner: null // null, 1, 2
    };

    this.dropCoin = this.dropCoin.bind(this);
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
    let lastRow = this.state.board.length - 1;
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

  checkForWinner(board) {
    if (this.checkRows(board) || this.checkColumns(board) || this.checkDiagonals(board)) {
      setTimeout(() => {
        alert(`Player ${this.state.turn} wins!`);
      }, 500);
    }
  }

  checkRows(board) {
    let winner = false;
    board.forEach((row) => {
      const rowWinner = row.reduce((prevPlayer, player) => {
        if (prevPlayer && player === prevPlayer) {
          return prevPlayer;
        }
        return null;
      });
      if (rowWinner) {
        winner = true;
      }
    });
    return winner;
  }

  getBoardColumns(board) {
    let columns = [[], [], []];
    columns.forEach((column, columnIndex) => {
      board.forEach((row) => {
        column.push(row[columnIndex]);
      });
    });
    return columns;
  }

  checkColumns(board) {
    let winner = false;
    const columns = this.getBoardColumns(board);
    columns.forEach((column) => {
      const columnWinner = column.reduce((prevPlayer, player) => {
        if (prevPlayer && player === prevPlayer) {
          return prevPlayer;
        }
        return null;
      });
      if (columnWinner) {
        winner = true;
      }
    });
    return winner;
  }

  checkTopLeftDiagonal(board) {
    // 00, 11, 22
    let winner = false;
    let prevPlayer = board[0][0];
    if (prevPlayer !== 0 && board[1][1] === prevPlayer) {
      if (board[2][2] === prevPlayer) {
        winner = true;
      }
    }
    return winner;
  }

  checkBottomLeftDiagonal(board) {
    // 02, 11, 20
    let winner = false;
    let prevPlayer = board[0][2];
    if (prevPlayer && board[1][1] === prevPlayer) {
      if (board[2][0] === prevPlayer) {
        winner = true;
      }
    }
    return winner;
  }

  checkDiagonals(board) {
    return this.checkTopLeftDiagonal(board) || this.checkBottomLeftDiagonal(board);
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
