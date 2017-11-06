import { createAction } from 'redux-actions';
import * as settingsActions from './settings';

export const actions = {
  JOIN_GAME: 'series/JOIN_GAME',
  LOADING: 'series/LOADING',
  LOADED: 'series/LOADED',
  ERROR: 'series/ERROR',
};

const loading = createAction(actions.LOADING);
const loaded = createAction(actions.LOADED);
const error = createAction(actions.ERROR, (payload) => payload);

export function joinGame() {
  return function(dispatch, getState) {
    const user = getState().user;
    const settings = getState().settings;

    console.log('*** USER ***', user);
    console.log('*** SETTINGS ***', settings);

    const player = Object.assign({}, user, { settings: settings });
    console.log('*** PLAYER ***', player);

    const socket = getState().app.socket;
    console.log('*** SOCKET ***', socket);

    // Emit game request event
    // getState().app.socket.emit('join-game', player, (res) => {
    //   // Set series and game objects in state
    //   console.log('*** JOIN GAME RES ***', res);
    // });
    
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