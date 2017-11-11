import { createAction } from 'redux-actions';
import { APP_PAGES } from '../../utilities/const';
import Series from '../../utilities/series';
import socketUtility from '../../utilities/socket';
import * as appActions from './app';
import * as gameActions from './game';

// timeout when waiting to 'join-game' response
let joinGameTimeout = null;

export const actions = {
  UPSERT_SERIES: 'series/UPSERT_SERIES',
  LOADING: 'series/LOADING',
  LOADED: 'series/LOADED',
  ERROR: 'series/ERROR',
};

const upsertSeries = createAction(actions.UPSERT_SERIES, (payload) => payload);
const loading = createAction(actions.LOADING);
const loaded = createAction(actions.LOADED);
const error = createAction(actions.ERROR, (payload) => payload);

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
      dispatch(gameActions.upsertGame(series.games[series.games.length - 1]));
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
      dispatch(gameActions.upsertGame(updatedSeries.games[updatedSeries.games.length - 1]));
    });

    // Lisenter for series response
    // socket.on('series-created', (series) => {
    //   console.log('*** SERIES CREATED ***', series);

    //   socket.emit('join-room', series.roomName);

    //   dispatch(initializeSeries(series));
    //   dispatch(gameActions.setCurrentGame(series.games[series.games.length - 1]));
    //   dispatch(appActions.changePage(APP_PAGES.SERIES));
    //   dispatch(loaded());
  }
}

export function cancelGameRequest() {
  return function(dispatch, getState) {
    const socket = socketUtility.socket;
    socket.emit('cancel-game-request', getState().user.username);
    dispatch(error('Game request cancelled.'));
  }
}

// export function startNextGame(series) {
//   return function(dispatch) {
//     dispatch(loading());
//     const socket = socketUtility.socket;

//     // emit start-next-game event
//     socket.emit('start-next-game', series, (updatedSeries) => {
//       // check if gameover in container to show SeriesResultsModal

//       console.log('\x1b[31m', '*** UPDATED SERIES', updatedSeries);

//       dispatch(upsertSeries(updatedSeries));

//       console.log('\x1b[32m', '*** SENDING TO CURRENT GAME REDUCER', updatedSeries.games[updatedSeries.games.length - 1]);

//       dispatch(gameActions.setCurrentGame(updatedSeries.games[updatedSeries.games.length - 1]));
//       dispatch(loaded());
//     });
//   }
// }