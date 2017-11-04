import { createAction } from 'redux-actions';
import * as util from '../../utilities/game-board';
import { POINTS, POINT_COUNTS } from '../../utilities/const';

export const actions = {
  DROP_COIN: 'game/DROP_COIN',
  TOGGLE_TURN: 'game/TOGGLE_TURN',
  SET_BOARD: 'game/SET_BOARD',
  SET_BOARD_POINTS: 'game/SET_BOARD_POINTS',
  UPDATE_BOARD: 'game/UPDATE_BOARD',
  COLLECT_POINTS: 'game/COLLECT_POINTS',
  WINNER: 'game/WINNER',
  LOADING: 'game/LOADING',
  LOADED: 'game/LOADED',
  COIN_DROP_ERROR: 'game/COIN_DROP_ERROR',
  ERROR: 'game/ERROR',
};

const toggleTurn = createAction(actions.TOGGLE_TURN);
const setBoard = createAction(actions.SET_BOARD, (payload) => payload);
const setBoardPoints = createAction(actions.SET_BOARD_POINTS, (payload) => payload);
const updateBoard = createAction(actions.UPDATE_BOARD, (payload) => payload);
const collectPoints = createAction(actions.COLLECT_POINTS, (payload) => payload);
const coinDropError = createAction(actions.COIN_DROP_ERROR);
const declareWinner = createAction(actions.WINNER, (payload) => payload);

export function initializeBoard(size) {
  return function(dispatch, getState) {
    const gameboard = createBoard(size);
    const boardPoints = createBoardPoints(size);
    dispatch(setBoard(gameboard));
    dispatch(setBoardPoints(boardPoints));
  }
}

export function dropCoin(colId, playerId) {
  return function(dispatch, getState) {
    const rowId = util.findEmptyRowId(getState().game.board, colId);

    if (typeof rowId === 'number') {
      dispatch(toggleTurn());
      dispatch(updateBoard({ rowId, colId, playerId }));
      dispatch(collectPoints({ rowId, colId, playerId }));

      const winner = util.getWinner(getState().game.board);

      if (winner) {
        dispatch(declareWinner(winner));

        // game over modal
        // 'results' button to check series overview
        // countdown to next round
        // 'next' button to start next round
        
        // add results to series history // dispatch(series.postResults(gameData))
        // reset score
        // reset gameboard
        // reset gameboard points

      } else {
        const tie = util.checkForTie(getState().game.board);
        
        if (tie) {
          const players = getState().game.players;
          const playerIds = Object.keys(players);
          const winner = getWinnerByPoints(players[playerIds[0]], players[playerIds[1]]);

          if (winner) {
            dispatch(declareWinner(winner));
          } else {
            // endGameInDraw();
          }
        }
      }
    } else {
      dispatch(coinDropError());
    }
  }
}

function createBoard(size) {
  const gameboard = [];
  for (let rowId = 0; rowId < size; rowId ++) {
    gameboard[rowId] = [];
    for (colId = 0; colId < size; colId ++) {
      gameboard[rowId][colId] = 0;
    }
  }
  return gameboard;
}

function createBoardPoints(size) {
  const boardPoints = [];
  let points = POINTS.slice();
  let pointCounts = POINT_COUNTS[size].slice();
  for (let rowId = 0; rowId < size; rowId ++) {
    boardPoints[rowId] = [];
    for (let colId = 0; colId < size; colId ++) {
      let i = Math.floor(Math.random() * points.length);
      boardPoints[rowId].push(points[i]);
      pointCounts[i] --;
      if (!pointCounts[i]) {
        points = points.slice(0, i).concat(points.slice(i + 1));
        pointCounts = pointCounts.slice(0, i).concat(pointCounts.slice(i + 1));
      }
    }
  }
  return boardPoints;
}