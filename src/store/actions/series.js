import { createAction } from 'redux-actions';
import socketUtility from '../../utilities/socket';
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
    dispatch(loading());

    const user = getState().user;
    const settings = getState().settings;
    const player = Object.assign({}, user, { settings: settings });
    console.log('*** PLAYER ***', player);

    // emit game request event
    socketUtility.socket().emit('join-game', player, (res) => {
      // Set series and game objects in state
      console.log('*** JOINING GAME ***', res);

      let newGame = {};

      if (res === 'waiting') {
        socketUtility.socket().on('opponent-found', (opponent) => {
          console.log('*** OPPONENT FOUND ***', opponent);
          newGame.opponent = opponent;
        });

        // wait up to 20 seconds for opponent
        setTimeout(() => {
          if (!newGame.opponent) {
            socketUtility.socket().emit('cancel-game-request', player.id, (res) => {
              console.log('*** GAME REQUEST CANCELLED ***', res);
            });
          }
        }, 20000);

          // try again later alert to return to menu
          // socket emit remove socket from waiting room
        // else configure series and settings from new response
      } else {
        // configure series and series settings with response data
        newGame.opponent = res;
      }
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