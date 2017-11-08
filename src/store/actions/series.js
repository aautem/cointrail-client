import { createAction } from 'redux-actions';
import { APP_PAGES } from '../../utilities/const';
import socketUtility from '../../utilities/socket';
import * as appActions from './app';
import * as gameActions from './game';

export const actions = {
  INITIALIZE_SERIES: 'series/INITIALIZE_SERIES',
  UPSERT_GAME: 'series/UPSERT_GAME',
  UPSERT_SERIES: 'series/UPSERT_SERIES',
  LOADING: 'series/LOADING',
  LOADED: 'series/LOADED',
  ERROR: 'series/ERROR',
};

const initializeSeries = createAction(actions.INITIALIZE_SERIES, (payload) => payload);
const loading = createAction(actions.LOADING);
const loaded = createAction(actions.LOADED);
const error = createAction(actions.ERROR, (payload) => payload);

export const upsertGame = createAction(actions.UPSERT_GAME, (payload) => payload);
export const upsertSeries = createAction(actions.UPSERT_SERIES, (payload) => payload);

export function startNextGame(series) {
  return function(dispatch) {
    dispatch(loading());
    const socket = socketUtility.socket;

    // emit start-next-game event
    socket.emit('start-next-game', series, (updatedSeries) => {
      // check if gameover in container to show SeriesResultsModal

      console.log('\x1b[31m', '*** UPDATED SERIES', updatedSeries);

      dispatch(upsertSeries(updatedSeries));

      console.log('\x1b[32m', '*** SENDING TO CURRENT GAME REDUCER', updatedSeries.games[updatedSeries.games.length - 1]);

      dispatch(gameActions.setCurrentGame(updatedSeries.games[updatedSeries.games.length - 1]));
      dispatch(loaded());
    });
  }
}

export function joinGame(user, settings) {
  return function(dispatch) {
    dispatch(loading());

    const player = Object.assign({}, user, { settings: settings });
    console.log('*** PLAYER ***', player.username);

    const socket = socketUtility.socket;

    // Lisenter for series response
    socket.on('series-created', (series) => {
      console.log('*** SERIES CREATED ***', series.roomName);

      socket.emit('join-room', series.roomName);
      dispatch(initializeSeries(series));
      dispatch(gameActions.setCurrentGame(series.games[series.games.length - 1]));
      dispatch(appActions.changePage(APP_PAGES.SERIES));
      dispatch(loaded());

      // MOVE THESE INTO THE SOCKET UTILITY CLASS!!!
      socket.on('game-update', (updatedGame) => {
        dispatch(upsertGame(updatedGame));
        dispatch(gameActions.setCurrentGame(updatedGame));
      });
  
      socket.on('series-update', (updatedSeries) => {
        dispatch(upsertSeries(updatedSeries));
        dispatch(gameActions.setCurrentGame(updatedSeries.games[updatedSeries.games.length - 1]));
      });
    });

    socket.emit('join-game', player, (response) => {
      console.log('*** JOIN GAME RESPONSE ***', response);

      // players{}
      // roomName
      // seriesLength
      // boardSize
      // timeLimit
      // gamesPlayed
      // games[]
      // winner
      // draw
      // seriesOver
      // winByPoints

      if (response === 'waiting') {
        let joined = false;

        socket.on('series-created', (series) => {
          console.log('*** SERIES CREATED ***', series.roomName);

          joined = true;
          socket.emit('join-room', series.roomName);

          dispatch(initializeSeries(series));
          dispatch(gameActions.setCurrentGame(series.games[series.games.length - 1]));
          dispatch(appActions.changePage(APP_PAGES.SERIES));
          dispatch(loaded());

          // MOVE THESE INTO THE SOCKET UTILITY CLASS!!!
          socket.on('game-update', (updatedGame) => {
            dispatch(upsertGame(updatedGame));
            dispatch(gameActions.setCurrentGame(updatedGame));
          });
      
          socket.on('series-update', (updatedSeries) => {
            dispatch(upsertSeries(updatedSeries));
            dispatch(gameActions.setCurrentGame(updatedSeries.games[updatedSeries.games.length - 1]));
          });
        });

        // // wait up to 20 seconds for opponent
        window.setTimeout(() => {
          if (!joined) {
            dispatch(error('Game request timeout.'));
            socket.emit('game-request-timeout', player.id, (ack) => {
              console.log('*** GAME REQUEST CANCELLED ***', ack);
            });
          }
        }, 20000);

        console.log('*** TIMEOUT SET ***');

        // try again later alert to return to menu
        // socket emit remove socket from waiting room
        // else configure series and settings from new response
      }
    });
  }
}

export function cancelGame(username) {
  return function(dispatch) {
    const socket = socketUtility.socket;

    socket.emit('cancel-game', username, (ack) => {
      console.log('*** GAME REQUEST CANCELLED ***', ack);
    });

    dispatch(error('Game request cancelled.'));
  }
}