import { createAction } from 'redux-actions';
import { APP_PAGES } from '../../utilities/const';
import socketUtility from '../../utilities/socket';
import * as appActions from './app';

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

export function joinGame() {
  return function(dispatch, getState) {
    dispatch(loading());

    const user = getState().user;
    const settings = getState().settings;
    const player = Object.assign({}, user, { settings: settings });
    console.log('*** PLAYER ***', player);

    const socket = socketUtility.socket();
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

        socket.on('series-created', (series, ack) => {
          console.log('*** SERIES CREATED ***', series);

          joined = true;
          dispatch(initializeSeries(series));
          dispatch(appActions.changePage(APP_PAGES.SERIES));
          dispatch(loaded());
          ack(200);
        });

        // wait up to 20 seconds for opponent
        setTimeout(() => {
          if (!joined) {
            socket.emit('game-request-timeout', player.id, (ack) => {
              console.log('*** GAME REQUEST CANCELLED ***', ack);

              dispatch(error(ack));
            });
          }
        }, 20000);

        // try again later alert to return to menu
        // socket emit remove socket from waiting room
        // else configure series and settings from new response

      } else {
        dispatch(initializeSeries(response));
        dispatch(appActions.changePage(APP_PAGES.SERIES));
        dispatch(loaded());
      }
    });

    socket.on('game-update', (updatedGame, ack) => {
      dispatch(upsertGame(updatedGame));
      ack(200);
    });

    socket.on('series-update', (updatedSeries, ack) => {
      dispatch(upsertSeries(updatedSeries));
      ack(200);
    });
    
    // SERVER:
      // check waiting room array (holds one player at a time -- next player creates game and empties waiting room)
        // if player already waiting
          // create new game room and configure series
        // if no player waiting
          // add to waiting room

    // CLIENT:
      // listen for new game event and game details
      // navigate to game page with these settings
  }
}