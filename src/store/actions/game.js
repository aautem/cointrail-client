import { createAction } from 'redux-actions';
import { APP_PAGES } from '../../utilities/const';
import Game from '../../utilities/game';
import socketUtility from '../../utilities/socket';
import * as appActions from './app';
import * as seriesActions from './series';

export const actions = {
  UPSERT_GAME: 'game/UPSERT_GAME',
  RESET: 'game/RESET',
  LOADING: 'game/LOADING',
  LOADED: 'game/LOADED',
  ERROR: 'game/ERROR',
};

const reset = createAction(actions.RESET);
const loading = createAction(actions.LOADING);
const loaded = createAction(actions.LOADED);
const error = createAction(actions.ERROR, (payload) => payload);

export const upsertGame = createAction(actions.UPSERT_GAME, (payload) => payload);

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
    game.initializeGame(player);
    dispatch(upsertGame(game));
    dispatch(appActions.changePage(APP_PAGES.SOLO));
    dispatch(loaded());
  }
}

export function endGame() {
  return function(dispatch) {
    dispatch(loading());
    dispatch(appActions.changePage('menu'));
    dispatch(loaded());
  }
}

export function resetGame() {
  return function(dispatch) {
    dispatch(reset());
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
      dispatch(upsertGame(gameInstance));
      dispatch(loaded());

      if (!gameInstance.gameOver) {
        // cpu drop coin
        if (gameInstance.turn !== getState().user.username) {
          setTimeout(() => {
            const colId = gameInstance.getOpenColumn();
            console.log('*** CPU DROPPING COIN ***', colId);
            dispatch(dropCoin(colId));
          }, 1500);
        }
      }
    } else {
      // emit dropcoin event to room
      const socket = socketUtility.socket;
      socket.emit('drop-coin', gameInstance);
      dispatch(loaded());
    }
  }
}