import { createAction } from 'redux-actions';
import Game from '../../utilities/game';
import socketUtility from '../../utilities/socket';
import * as appActions from './app';
import * as seriesActions from './series';

export const actions = {
  SET_CURRENT_GAME: 'game/SET_CURRENT_GAME',
  LOADING: 'game/LOADING',
  LOADED: 'game/LOADED',
  ERROR: 'game/ERROR',
};

const loading = createAction(actions.LOADING);
const loaded = createAction(actions.LOADED);
const error = createAction(actions.ERROR, (payload) => payload);
export const setCurrentGame = createAction(actions.SET_CURRENT_GAME, (payload) => payload);

export function startSoloGame() {
  return function (dispatch, getState) {
    dispatch(loading());
    const settings = {
      mode: 'solo',
      roomName: 'solo',
      boardSize: getState().settings.boardSize,
      timeLimit: getState().settings.timeLimit,
    };
    const game = new Game(settings);
    const player = {
      id: getState().user.id,
      username: getState().user.username,
      avatarUrl: getState().user.avatarUrl,
      color: getState().settings.color,
    };
    game.initializeSoloGame(player);
    dispatch(setCurrentGame(game));
    dispatch(appActions.changePage('solo'));
    dispatch(loaded());
  }
}

export function dropCoin(colId) {
  return function(dispatch, getState) {
    dispatch(loading());
    const game = Object.assign({}, getState().game);
    const gameInstance = new Game(game);
    gameInstance.dropCoin(colId);

    // DO ALL CALCULATION ON FRONT END AND SEND UPDATED GAME/SERIES TO SERVER
    // just have to turn it back into a game class instance
    // (do this now so we don't mutate the state)
    if (gameInstance.mode === 'solo') {
      dispatch(setCurrentGame(gameInstance));
      dispatch(loaded());

      if (!gameInstance.gameOver) {
        if (gameInstance.turn !== getState().user.username) {
          setTimeout(() => {
            const colId = gameInstance.getOpenColumn();
            dispatch(dropCoin(colId));
          }, 5000);
        }
      }
    } else {
      // emit dropcoin event to room
      const socket = socketUtility.socket;
      socket.emit('drop-coin', { game: game, colId: colId }, (ack) => {
        console.log('*** DROP COIN ACK ***', ack);
        dispatch(loaded());
      });
    }
  }
}