import getInitialState from '../initial-state';
import { actions } from '../actions/game';

const initialState = getInitialState().game;

export default function reducer(state = initialState, action) {
  const playerIds = Object.keys(state.players);
  let rowId, colId, playerId;
  
  if (action.type === actions.TOGGLE_TURN) {
    const turn = playerIds[0] === state.turn ? playerIds[1] : playerIds[0];
    return Object.assign({}, state, { turn: turn });
  }

  if (action.type === actions.SET_BOARD) {
    return Object.assign({}, state, { board: action.payload });
  }

  if (action.type === actions.SET_BOARD_POINTS) {
    return Object.assign({}, state, { boardPoints: action.payload });
  }

  if (action.type === actions.UPDATE_BOARD) {
    rowId = action.payload.rowId;
    colId = action.payload.colId;
    playerId = action.payload.playerId;

    const board = state.board.slice();

    board[rowId][colId] = playerId;
    return Object.assign({}, state, { board: board });
  }

  if (action.type === actions.COLLECT_POINTS) {
    rowId = action.payload.rowId;
    colId = action.payload.colId;
    playerId = action.payload.playerId;

    const points = state.boardPoints[rowId][colId];
    const totalPoints = state.players[playerId].score + points;
    const players = Object.assign({}, state.players);

    players[playerId].score = totalPoints;
    return Object.assign({}, state, { players: players });
  }

  if (action.type === actions.WINNER) {
    return Object.assign({}, state, { winner: action.payload });
  }

  return state;
};