import { createAction } from 'redux-actions';
import Game from '../../utilities/game';
import socketUtility from '../../utilities/socket';
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
      roomName: 'solo',
      boardSize: getState().settings.boardSize,
      timeLimit: getState().settings.timeLimit,
    };
    const game = new Game(settings);
    const player = {
      id: getState().user.id,
      username: getState().user.username,
      avatarUrl: geState().user.avatarUrl,
      color: getState().settings.color,
    };
    game.initializeSoloGame(player);
    dispatch(setCurrentGame(game));
    dispatch(appActions.changePage('solo'));
    dispatch(loaded());
  }
}

export function dropCoin(game, colId) {
  return function(dispatch) {
    dispatch(loading());

    // emit dropcoin event to room
    const socket = socketUtility.socket;
    socket.emit('drop-coin', { game: game, colId: colId }, (ack) => {
      console.log('*** DROP COIN ACK ***', ack);
      dispatch(loaded());
    });
  }
}