import Game from './game';
import { SeriesPlayer } from './player';

// players: null,
// roomName: null,
// seriesLength: 7,
// boardSize: 4,
// timeLimit: false,
// gamesPlayed: 0,
// games: [],
// turn: null, // WHO STARTED THIS GAME // Alternate between games
// winner: null,
// draw: null,
// seriesOver: null,
// winByPoints: null,
// winByConnect: null,
// disconnection: false,

export default class Series {
  constructor(props) {
    if (props.turn) {
      this._buildSeriesInProgress(props);
    } else {
      this.roomName = props.roomName;
      this.seriesLength = props.seriesLength;
      this.boardSize = props.boardSize;
      this.timeLimit = props.timeLimit;
      this.gamesPlayed = 0;
      this.games = [];
      this.winner = null;
      this.draw = false;
      this.seriesOver = false;
      this.winByPoints = false;
      this.winByConnect = false;
      this.disconnection = false;

      // initialized later
      this.players = null;
      this.turn = null;
    }
  }

  initializeSeries(p1, p2) {
    this._initializeSeriesPlayers(p1, p2);
    this._startNewGame(p1.settings);
  }

  _initializeSeriesPlayers(p1, p2) {
    const p1Color = p1.settings.color;
    const p2Color = p2.settings.color === p1Color ? p2.settings.altColor : p2.settings.color;
    p1.color = p1Color;
    p2.color = p2Color;

    const player1 = new SeriesPlayer(p1);
    const player2 = new SeriesPlayer(p2);

    const players = {};
    players[player1.username] = player1;
    players[player2.username] = player2;
    this.turn = player1.username;
    this.players = players;
  }

  _startNewGame(settings) {
    const gameConfig = {
      mode: 'series',
      roomName: this.roomName,
      boardSize: settings.boardSize,
      timeLimit: settings.timeLimit,
    };
    const game = new Game(gameConfig);
    const usernames = Object.keys(this.players);
    const p1 = this.players[this.turn];
    const p2 = usernames[0] === this.turn ? this.players[usernames[1]] : this.players[usernames[0]];
    game.initializeGame(p1, p2);
    this.games.push(game);
  }

  _createInSeriesInstance(props) {
    this.seriesLength = props.seriesLength;
    this.boardSize = props.boardSize;
    this.timeLimit = props.timeLimit;
    this.gamesPlayed = props.gamesPlayed;
    this.games = props.games;
    this.winner = props.winner;
    this.draw = props.draw;
    this.seriesOver = props.seriesOver;
    this.winByPoints = props.winByPoints;
    this.players = props.players;
    this.roomName = props.roomName;
    this._updateSeries();
  }

  _updateSeries() {
    // add stats from last game to series stats and seriesPlayers
    const game = this.games[this.gamesPlayed];
    const usernames = this._getUsernames();

    // update game count and series player W/L/D/points
    this.gamesPlayed += 1;
    this.players[usernames[0]].points += game.players[usernames[0]].points;
    this.players[usernames[1]].points += game.players[usernames[1]].points;

    console.log('\x1b[33m', 'Checkpoint :: gamesPlayed =', this.gamesPlayed);

    if (game.winner) {
      const loser = game.winner === usernames[0] ? usernames[1] : usernames[0];
      this.players[game.winner].wins += 1;
      this.players[loser].losses += 1;
    } else if (game.draw) {
      this.players[usernames[0]].draws += 1;
      this.players[usernames[1]].draws += 1;
    }

    // check for series winner
    if (this._seriesClosedOut()) {
      this.seriesOver = true;
      this.winner = this._determineSeriesWinner();
    } else {
      console.log('\x1b[33m', 'Checkpoint :: starting new game...', this.players[game.winner]);
      this._startNewGame(this.players[usernames[0]], this.players[usernames[1]]);
    }
  }

  _determineSeriesWinner() {
    const usernames = this._getUsernames();
    const p1 = this.players[usernames[0]];
    const p2 = this.players[usernames[1]];
    if (p1.wins === p2.wins) {
      if (p1.points === p2.points) {
        this.draw = true;
      } else {
        this.winner = p1.points > p2.points ? p1.username : p2.username;
        this.winByPoints = true;
      }
    } else {
      const winThreshold = this._getWinsNeededToClose();
      if (p1.wins >= winThreshold) {
        this.winner = p1.username;
      } else if (p2.wins >= winThreshold) {
        this.winner = p2.username;
      }
    }
  }

  _seriesClosedOut() {
    const winThreshold = this._getWinsNeededToClose();
    const usernames = this._getUsernames();
    const p1 = this.players[usernames[0]];
    const p2 = this.players[usernames[1]];
    if (p1.wins >= winThreshold || p2.wins >= winThreshold) {
      return true;
    }
    return false;
  }

  _getWinsNeededToClose() {
    if (this.seriesLength === 1) {
      return 1;
    }
    return (this.seriesLength / 2) + 1;
  }

  _getUsernames() {
    return Object.keys(this.players);
  }

  addGameWinner(username) {
    //
  }

  checkForSeriesWinner() {
    //
  }
}