import { GamePlayer } from './player';

// mode: null, // online | solo
// roomName: null,
// boardSize: null,
// timeLimit: null,
// winner: null,
// draw: false,
// gameOver: false,
// winByPoints: false,
// winByConnect: false,
// board: null,
// boardPoints: null,
// players: null,
// turn: null,
// disconnection: false,

export default class Game {
  constructor(props) {
    if (props.turn) {
      this._buildGameInProgress(props);
    } else {
      this.mode = props.mode;
      this.roomName = props.roomName;
      this.boardSize = props.boardSize;
      this.timeLimit = props.timeLimit;
      this.winner = null;
      this.draw = false;
      this.gameOver = false;
      this.winByConnect = false;
      this.winByPoints = false;
      this.disconnection = false;
  
      // initialized later
      this.board = null;
      this.boardPoints = null;
      this.players = null;
      this.turn = null;
    }
  }

  // solo games only require p1 arg
  initializeGame(p1, p2) {
    this._initializeBoard();
    this._initializeBoardPoints();
    this._initializePlayers(p1, p2);
  }

  _pointValues() {
    return [5, 10, 15, 25, 35, 50];
  }

  _pointsPerBoard() {
    return {
      // 4x4 -- 16 spaces
      4: [4, 4, 4, 2, 1, 1],
      // 5x5 -- 25 spaces
      5: [6, 6, 6, 4, 2, 1],
      // 6x6 -- 36 spaces
      6: [10, 8, 8, 6, 2, 2],
    };
  }

  _initializeBoard() {
    const board = [];
    for (let rowId = 0; rowId < this.boardSize; rowId ++) {
      board[rowId] = [];
      for (let colId = 0; colId < this.boardSize; colId ++) {
        board[rowId][colId] = '';
      }
    }
    this.board = board;
  }

  _initializeBoardPoints() {
    const boardPoints = [];
    let pointValues = this._pointValues();
    let pointsPerBoard = this._pointsPerBoard()[this.boardSize];
    for (let rowId = 0; rowId < this.boardSize; rowId ++) {
      boardPoints[rowId] = [];
      for (let colId = 0; colId < this.boardSize; colId ++) {
        let random = Math.floor(Math.random() * pointValues.length);
        boardPoints[rowId].push(pointValues[random]);
        pointsPerBoard[random] --;
        if (!pointsPerBoard[random]) {
          pointValues = pointValues.slice(0, random).concat(pointValues.slice(random + 1));
          pointsPerBoard = pointsPerBoard.slice(0, random).concat(pointsPerBoard.slice(random + 1));
        }
      }
    }
    this.boardPoints = boardPoints;
  }

  _initializePlayers(p1, p2) {
    const players = {};

    if (!p2) {
      // solo game
      const cpu = this._getRandomProfile();
      players[cpu.username] = new GamePlayer(cpu);
      players[p1.username] = new GamePlayer(p1);
      this.turn = p1.username;
      this.players = players;
    } else {
      // online game
      players[p1.username] = new GamePlayer(p1);
      players[p2.username] = new GamePlayer(p2);
      this.turn = p1.username;
      this.players = players;
    }
  }

  _getRandomProfile() {
    const profiles = [
      {
        id: 'cpu', username: 'ladylexy', color: 'orange',
        avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      },
      {
        id: 'cpu', username: 'kfriedson', color: 'red',
        avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg',
      },
      {
        id: 'cpu', username: 'brynn', color: 'green',
        avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
      },
      {
        id: 'cpu', username: 'adhamdannaway', color: 'blue',
        avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      }
    ];
    const index = Math.floor(Math.random() * (profiles.length - 1));
    return profiles[index];
  }

  dropCoin(colId) {
    const rowId = this._findEmptyRowId(colId);

    if (rowId !== null) {
      const points = this._getBoardPoints(rowId, colId);
      this.players[this.turn].points += points;
      this._addToBoard(rowId, colId);

      const winner = this._getConnectWinner();
      if (winner) {
        this.turn = null;
        this.winner = winner;
        this.players[winner].winner = true;
        this.winByConnect = true;
        this.gameOver = true;
      } else {
        const draw = this._checkForDraw();
        if (draw) {
          const winnerByPoints = this._getWinnerByPoints();
          if (winnerByPoints) {
            this.turn = null;
            this.winner = winnerByPoints;
            this.winByPoints = true;
            this.gameOver = true;
          } else {
            this.turn = null;
            this.draw = true;
            this.gameOver = true;
          }
        } else {
          const usernames = Object.keys(this.players);
          const nextTurn = this.turn === usernames[0] ? usernames[1] : usernames[0];
          this.turn = nextTurn;
        }
      }
    }
  }

  getOpenColumn() {
    const colIds = [];
    this.board[0].forEach((column, i) => {
      if (!column) {
        colIds.push(i);
      }
    });
    if (colIds.length) {
      const random = Math.floor(Math.random() * (colIds.length - 1));
      return colIds[random];
    }
    return null;
  }

  _findEmptyRowId(colId) {
    let emptyRowId = null;
    for (let rowId = this.boardSize - 1; rowId >= 0; rowId --) {
      if (emptyRowId === null && !this.board[rowId][colId]) {
        emptyRowId = rowId;
      }
    }
    return emptyRowId;
  }

  _addToBoard(rowId, colId) {
    this.board[rowId][colId] = this.turn;
  }

  _getBoardPoints(rowId, colId) {
    return this.boardPoints[rowId][colId];
  }

  _getConnectWinner() {
    const rows = this.board.slice();
    const columns = this._getWinningColumns();
    const diagonals = this._getWinningDiagonals();
    return this._checkWinningLines([...rows, ...columns, ...diagonals]);
  }

  _checkWinningLines(winningLines) {
    let winner = null;
    winningLines.forEach((line) => {
      if (!winner) {
        let winningPlayer = line.reduce((prevPlayer, nextPlayer) => {
          if (prevPlayer && nextPlayer === prevPlayer) {
            return prevPlayer;
          }
          return null;
        });
        if (winningPlayer) {
          winner = winningPlayer;
        }
      }
    });
    return winner;
  }

  _getWinningColumns() {
    let columns = [];
    for (let colId = 0; colId < this.boardSize; colId ++) {
      columns[colId] = [];
      this.board.forEach((row) => {
        columns[colId].push(row[colId]);
      });
    }
    return columns;
  }

  _getWinningDiagonals() {
    const topToBot = [];
    const botToTop = [];
    let colId = this.boardSize - 1;
    for (let rowId = 0; rowId < this.boardSize; rowId ++) {
      // top left --> bot right: [0, 0], [1, 1], [2, 2], [3, 3]
      topToBot.push(this.board[rowId][rowId]);
      // bot left --> top right: [0, 3], [1, 2], [2, 1], [3, 0]
      botToTop.push(this.board[rowId][colId --]);
    }
    return [topToBot, botToTop];
  }

  _checkForDraw() {
    let draw = true;
    this.board.forEach((row, rowId) => {
      if (draw) {
        row.forEach((col, colId) => {
          if (!this.board[rowId][colId]) {
            draw = false;
          }
        });
      }
    });
    return draw;
  }

  _getWinnerByPoints() {
    const players = Object.keys(this.players);
    const player1 = this.players[players[0]];
    const player2 = this.players[players[1]];
    if (player1.points === player2.points) {
      return null;
    }
    return player1.points > player2.points ? player1.username : player2.username;
  }

  _buildGameInProgress(props) {
    this.mode = props.mode;
    this.roomName = props.roomName;
    this.boardSize = props.boardSize;
    this.timeLimit = props.timeLimit;
    this.winner = props.winner;
    this.draw = props.draw;
    this.gameOver = props.gameOver;
    this.winByConnect = props.winByConnect;
    this.winByPoints = props.winByPoints;
    this.disconnection = props.disconnection;
    this.board = props.board;
    this.boardPoints = props.boardPoints;
    this.players = props.players;
    this.turn = props.turn;
  }
}