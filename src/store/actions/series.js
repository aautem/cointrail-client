import { createAction } from 'redux-actions';
import { APP_PAGES } from '../../utilities/const';
import Series from '../../utilities/series';
import socketUtility from '../../utilities/socket';
import * as appActions from './app';
import * as gameActions from './game';
import * as statsActions from './stats';

// timeout when waiting to 'join-game' response
let joinGameTimeout = null;

export const actions = {
  UPSERT_SERIES: 'series/UPSERT_SERIES',
  RESET: 'series/RESET',
  LOADING: 'series/LOADING',
  LOADED: 'series/LOADED',
  ERROR: 'series/ERROR',
};

const upsertSeries = createAction(actions.UPSERT_SERIES, (payload) => payload);
const reset = createAction(actions.RESET);
const loading = createAction(actions.LOADING);
const loaded = createAction(actions.LOADED);
const error = createAction(actions.ERROR, (payload) => payload);

export function endSeries() {
  return function(dispatch, getState) {
    dispatch(loading());
    dispatch(statsActions.saveStats(getState().series));
    dispatch(reset());
    dispatch(appActions.changePage('menu'));
    dispatch(loaded());
  }
}

// ON SERIES UPDATE
// EMIT 'updated-series' SOCKET EVENT TO GAMEROOM WITH SERIES TO SYNC BOARD POINTS
// server side will keep track of if series has been sent out to players
// so that both users don't trigger the 'series-update' listener on the client
export function continueSeries() {
  return function(dispatch, getState) {
    dispatch(loading());

    // update series object with stats from completed game
    const series = new Series(Object.assign({}, getState().series));
    series.updateSeries(Object.assign(getState().game));

    console.log('\x1b[32m', 'Continuing Series', series);

    if (!series.seriesOver) {
      // emit updated series to game room
      const socket = socketUtility.socket;
      socket.emit('updated-series', series);
      dispatch(loaded());
    } else {
      // series over -- upsert on own
      dispatch(gameActions.resetGame());
      dispatch(upsertSeries(series));
      dispatch(loaded());
    }

    // if seriesOver
      // leave socket room
      // dispatch showResultsModal
  }
}

export function joinGame(user, settings) {
  return function(dispatch) {
    dispatch(loading());

    console.log('\x1b[32m', user.username, 'joining game...');

    const player = Object.assign({}, user, { settings: settings });
    const socket = socketUtility.socket;

    // set up listener for 'game-joined' event
    socket.on('game-joined', (players) => {
      clearTimeout(joinGameTimeout);

      // join the game room to subscribe to its events: [P1_USERNAME]-vs-[P2_USERNAME]
      const roomName = `${players.p1.username}-vs-${players.p2.username}`;
      socket.emit('join-room', roomName);
      
      // initialize the series
      const seriesConfig = {
        roomName: roomName,
        seriesLength: players.p1.settings.seriesLength,
        boardSize: players.p1.settings.boardSize,
        timeLimit: players.p1.settings.timeLimit,
      };
      const series = new Series(seriesConfig);
      series.initializeSeries(players.p1, players.p2);

      // listen for game and series updates in joined room
      dispatch(upsertSeries(series));
      const newGame = Object.assign({}, series.games[series.games.length - 1]);
      dispatch(gameActions.upsertGame(newGame));
      dispatch(appActions.changePage(APP_PAGES.SERIES));
      dispatch(loaded());
    });

    // wait up to 20 seconds for opponent
    joinGameTimeout = window.setTimeout(() => {
      socket.emit('cancel-game-request', player.username);
      dispatch(error('Game request timeout.'));
    }, 20000);
    console.log('\x1b[33m', 'Game request timeout set.');

    // emit the game request
    socket.emit('join-game', player);

    // move these listeners into the socket utility
    // how to dispatch actions from utility?
    socket.on('game-update', (updatedGame) => {
      dispatch(gameActions.upsertGame(updatedGame));
    });

    socket.on('series-update', (updatedSeries) => {
      dispatch(upsertSeries(updatedSeries));
      const updatedGame = Object.assign({}, updatedSeries.games[updatedSeries.games.length - 1]);
      dispatch(gameActions.upsertGame(updatedGame));
    });
  }
}

export function cancelGameRequest() {
  return function(dispatch, getState) {
    const socket = socketUtility.socket;
    socket.emit('cancel-game-request', getState().user.username);
    dispatch(error('Game request cancelled.'));
  }
}