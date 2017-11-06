import { createAction } from 'redux-actions';
import socketUtility from '../../utilities/socket';
import * as seriesActions from './series';

export const actions = {
  LOADING: 'game/LOADING',
  LOADED: 'game/LOADED',
  ERROR: 'game/ERROR',
};

const loading = createAction(actions.LOADING);
const loaded = createAction(actions.LOADED);
const error = createAction(actions.ERROR, (payload) => payload);

export function dropCoin(game, colId) {
  return function(dispatch) {
    dispatch(loading());

    // emit dropcoin event to room
    const socket = socketUtility.socket();
    socket.emit('drop-coin', { game: game, colId: colId }, (ack) => {
      console.log('*** DROP COIN ACK ***', ack);
      dispatch(loaded());
    });
  }
}