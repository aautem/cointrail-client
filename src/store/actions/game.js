import { createAction } from 'redux-actions';
import { APP_PAGES, GAME_MODES } from '../../utilities/const';
import Game from '../../utilities/game';
import socketUtility from '../../utilities/socket';
import * as appActions from './app';

// timeout when waiting for 'join-game' response
let joinGameTimeout = null;

export const actions = {
  SET_GAME: 'game/SET_GAME',
  OPEN_RESULTS_MODAL: 'game/OPEN_RESULTS_MODAL',
  CLOSE_RESULTS_MODAL: 'game/CLOSE_RESULTS_MODAL',
  LOADING: 'game/LOADING',
  LOADED: 'game/LOADED',
  ERROR: 'game/ERROR',
  RESET: 'game/RESET',
};

const setGame = createAction(actions.SET_GAME, (payload) => payload);
const openResultsModal = createAction(actions.OPEN_RESULTS_MODAL);
const closeResultsModal = createAction(actions.CLOSE_RESULTS_MODAL);
const loading = createAction(actions.LOADING);
const loaded = createAction(actions.LOADED);
const error = createAction(actions.ERROR, (payload) => payload);
const reset = createAction(actions.RESET);


// vvvvvvvvvvvvvvvvvvvvv

// const showRequestModal = createAction(actions.SHOW_MODAL);
// const hideRequestModal = createAction(actions.HIDE_MODAL);

// ^^^^^^^^^^^^^^^^^^^


export function startSoloGame(user) {
  return function (dispatch) {
    dispatch(loading());
    const settings = {
      mode: 'solo',
      roomName: 'solo',
      boardSize: user.settings.boardSize,
      timeLimit: user.settings.timeLimit,
    };
    const game = new Game(settings);
    const player = {
      id: user.socketId,
      username: user.username,
      avatarUrl: user.avatarUrl,
      color: user.settings.color,
    };
    game.initializeGame(player);
    dispatch(setGame(game));
    dispatch(appActions.changePage(APP_PAGES.GAME));
    dispatch(loaded());
  }
}

export function dropCoin(colId) {
  return function(dispatch, getState) {
    dispatch(loading());

    const game = Object.assign({}, getState().game);
    const gameInstance = new Game(game);
    gameInstance.dropCoin(colId);

    console.log('Coin dropped:', gameInstance);

    if (gameInstance.mode === GAME_MODES.SOLO) {
      dispatch(setGame(gameInstance));
      dispatch(loaded());
      if (!gameInstance.gameOver && gameInstance.turn !== getState().user.username) {
        // cpu drop coin
        setTimeout(() => {
          const colId = gameInstance.getOpenColumn();
          dispatch(dropCoin(colId));
        }, 1500);
      } else if (gameInstance.gameOver) {
        // show gameResultsModal
        setTimeout(() => {
          dispatch(openResultsModal());
        }, 1500);
      }
    } else if (gameInstance.mode === GAME_MODES.ONLINE) {
      // emit dropcoin event to room
      const socket = socketUtility.socket;
      socket.emit('drop-coin', gameInstance);
      dispatch(loaded());
    }
  }
}


// vvvvvvvvvvvvvvvvvvvvv

export function joinGame() {
  return function(dispatch, getState) {
    dispatch(loading());
    dispatch(showRequestModal());

    const player = Object.assign({}, getState().user, { settings: getState().settings });
    const socket = socketUtility.socket;

    // set up listener for 'game-joined' event
    socket.on('game-joined', (players) => {
      clearTimeout(joinGameTimeout);
      dispatch(hideRequestModal());

      // join the game room to subscribe to its events: [P1_USERNAME]-vs-[P2_USERNAME]
      const roomName = `${players.p1.username}-vs-${players.p2.username}`;
      socket.emit('join-room', roomName);

      socket.on('game-over', (username) => {
        alert(`${username} has left the game.`);
        socket.emit('end-game', roomName);
        dispatch(reset());
        dispatch(appActions.changePage('menu'));
      });

      // set player colors
      players.p1.color = players.p1.settings.color;
      players.p2.color = players.p2.settings.color === players.p1.color ? players.p2.settings.altColor : players.p2.settings.color;

      // initialize the game
      const settings = {
        mode: 'online',
        roomName: roomName,
        boardSize: players.p1.settings.boardSize,
        timeLimit: players.p1.settings.timeLimit,
      };
      const game = new Game(settings);
      game.initializeGame(players.p1, players.p2);
      dispatch(upsertGame(game));
      dispatch(appActions.changePage(APP_PAGES.GAME));
      dispatch(loaded());
    });

    // wait up to 20 seconds for opponent
    joinGameTimeout = window.setTimeout(() => {
      socket.emit('cancel-game-request', player.username);
      dispatch(hideRequestModal());
      dispatch(error('Game request timeout.'));
    }, 15000);

    console.log('\x1b[33m', 'Game request timeout set.');

    // emit the game request
    socket.emit('join-game', player);

    // update the game object in state and save stats if game over
    socket.on('game-update', (updatedGame) => {
      dispatch(loading());
      dispatch(upsertGame(updatedGame));
      if (updatedGame.gameOver) {
        // dispatch(statsActions.saveStats(updatedGame));
      }
      dispatch(loaded());
    });
  }
}

export function playOnlineAgain() {
  return function (dispatch, getState) {
    dispatch(loading());

    // initialize new game
    const settings = {
      mode: 'online',
      roomName: getState().game.roomName,
      boardSize: getState().game.boardSize,
      timeLimit: getState().game.timeLimit,
    };
    const players = getState().game.players;
    const usernames = Object.keys(players);
    const game = new Game(settings);
    game.initializeGame(players[usernames[0]], players[usernames[1]]);
    dispatch(upsertGame(game));
    dispatch(appActions.changePage(APP_PAGES.GAME));
    dispatch(loaded());
  }
}

export function endGame() {
  return function(dispatch, getState) {
    dispatch(loading());

    const roomName = getState().game.roomName;
    const gameMode = getState().game.mode;

    dispatch(reset());
    dispatch(appActions.changePage('menu'));
    dispatch(loaded());

    if (gameMode === 'online') {
      const socket = socketUtility.socket;
      socket.emit('end-game', roomName);
    }
  }
}

export function resetGame() {
  return function(dispatch) {
    dispatch(reset());
  }
}

export function cancelGameRequest() {
  return function(dispatch, getState) {
    dispatch(loading());
    const socket = socketUtility.socket;
    socket.emit('cancel-game-request', getState().user.username);
    dispatch(error('Game request cancelled.'));
  }
}