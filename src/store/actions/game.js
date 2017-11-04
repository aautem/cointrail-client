import { createAction } from 'redux-actions';

export const actions = {
  DROP_COIN: 'game/DROP_COIN',
  TOGGLE_TURN: 'game/TOGGLE_TURN',
  LOADING: 'game/LOADING',
  LOADED: 'game/LOADED',
  ERROR: 'game/ERROR',
};

const toggleTurn = createAction(actions.TOGGLE_TURN);
// const toggleTurn = createAction(actions.TOGGLE_TURN, (payload) => payload);

export function dropCoin(colId, playerId) {
  return function(dispatch, getState) {
    const board = getState().game.board.slice();
    const rowId = findEmptyRowId(board, colId);
    if (typeof rowId === 'number') {
      // switch turn
      // collect points
      // add coin / update board
      // check for winner

      dispatch(toggleTurn());

      dispatch({
        type: actions.COLLECT_POINTS,
      });

    } else {
      console.log('No empty spaces...');
    }

    dispatch({
      type: actions.DROP_COIN,
      payload: colId,
    });
  }
}

function findEmptyRowId(board, colId) {
  let emptyRowId = null;
  for (let rowId = board.length - 1; rowId >= 0; rowId --) {
    if (typeof emptyRowId !== 'number' && board[rowId][colId] === 0) {
      emptyRowId = rowId;
    }
  }
  return emptyRowId;
}