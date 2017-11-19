import { createAction } from 'redux-actions';
import { APP_PAGES, GAME_MODES } from '../../utilities/const';
import Game from '../../utilities/game';
import socketUtility from '../../utilities/socket';
import * as appActions from './app';
import * as userActions from './user';
import { pick } from 'lodash';

// Timeout when waiting for 'join-game' response
let joinGameTimeout = null;

export const actions = {
  SET_GAME: 'game/SET_GAME',
  OPEN_RESULTS_MODAL: 'game/OPEN_RESULTS_MODAL',
  CLOSE_RESULTS_MODAL: 'game/CLOSE_RESULTS_MODAL',
  OPEN_REQUEST_MODAL: 'game/OPEN_REQUEST_MODAL',
  CLOSE_REQUEST_MODAL: 'game/CLOSE_REQUEST_MODAL',
  START_GAME_REQUEST: 'game/START_GAME_REQUEST',
  END_GAME_REQUEST: 'game/END_GAME_REQUEST',
  LOADING: 'game/LOADING',
  LOADED: 'game/LOADED',
  ERROR: 'game/ERROR',
  RESET: 'game/RESET',
};

const setGame = createAction(actions.SET_GAME, (payload) => payload);
const openResultsModal = createAction(actions.OPEN_RESULTS_MODAL);
const closeResultsModal = createAction(actions.CLOSE_RESULTS_MODAL);
const openRequestModal = createAction(actions.OPEN_REQUEST_MODAL);
const closeRequestModal = createAction(actions.CLOSE_REQUEST_MODAL);
const startGameRequest = createAction(actions.START_GAME_REQUEST);
const endGameRequest = createAction(actions.END_GAME_REQUEST);
const loading = createAction(actions.LOADING);
const loaded = createAction(actions.LOADED);
const error = createAction(actions.ERROR, (payload) => payload);
const reset = createAction(actions.RESET);

export function startSoloGame() {
  return function (dispatch, getState) {
    dispatch(loading());
    dispatch(reset());
    
    const user = getState().user;
    const settings = {
      mode: GAME_MODES.SOLO,
      roomName: GAME_MODES.SOLO,
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

export function joinGame() {
  return function(dispatch, getState) {
    dispatch(startGameRequest());
    dispatch(openRequestModal());

    const player = pick(getState().user, ['username', 'socketId', 'avatarUrl', 'settings']);
    const socket = socketUtility.socket;

    // set up listener for 'game-joined' event
    socket.on('game-joined', (players) => {
      clearTimeout(joinGameTimeout);

      console.log('Game joined:', players);

      // join the game room to subscribe to its events: [P1_USERNAME]-vs-[P2_USERNAME]
      const roomName = `${players.p1.username}-vs-${players.p2.username}`;
      socket.emit('join-room', roomName);

      socket.on('game-over', (username) => {
        dispatch(loading());

        alert(`${username} has left the game.`);
        socket.emit('end-game', roomName);

        dispatch(appActions.changePage(APP_PAGES.MENU));
        dispatch(reset());
        dispatch(loaded());
      });

      // set player colors
      players.p1.color = players.p1.settings.color;
      players.p2.color = players.p2.settings.color === players.p1.color ? players.p2.settings.altColor : players.p2.settings.color;

      // initialize the game
      const settings = {
        mode: GAME_MODES.ONLINE,
        roomName: roomName,
        boardSize: players.p1.settings.boardSize,
        timeLimit: players.p1.settings.timeLimit,
      };
      const game = new Game(settings);
      game.initializeGame(players.p1, players.p2);
      dispatch(setGame(game));
      dispatch(appActions.changePage(APP_PAGES.GAME));

      dispatch(closeRequestModal());
      dispatch(endGameRequest());
    });

    // wait up to 20 seconds for opponent
    joinGameTimeout = window.setTimeout(() => {
      socket.emit('cancel-game-request', player.username);
      dispatch(closeRequestModal());
      dispatch(endGameRequest());
      alert('Game request timeout.');
    }, 15000);

    console.log('\x1b[33m', 'Game request timeout set.');

    // emit the game request
    socket.emit('join-game', player);

    // update the game object in state and save stats if game over
    socket.on('game-update', (updatedGame) => {
      dispatch(loading());
      dispatch(setGame(updatedGame));
      if (updatedGame.gameOver) {
        // show gameResultsModal
        setTimeout(() => {
          dispatch(openResultsModal());
        }, 1500);
        // save stats
        dispatch(userActions.saveStats());
      }
      dispatch(loaded());
    });
  }
}

export function requestGameWithFriend(friend) {
  return function(dispatch, getState) {
    // check if friend is online
    const socket = socketUtility.socket;
    socket.emit('online-request', getState().user.username, (playersOnline) => {
      dispatch(appActions.upsertOnlinePlayers(playersOnline));
      if (playersOnline.indexOf(friend.username) === -1) {
        alert(`${friend.username} is offline. Please try again later.`);
      } else {
        dispatch(startGameRequest());
        dispatch(openRequestModal());

        const player1 = pick(getState().user, ['username', 'socketId', 'avatarUrl', 'settings']);
        const player2 = pick(friend, ['username', 'socketId', 'avatarUrl', 'settings']);

        // set up listener for 'game-joined' event
        socket.on('game-joined', (players) => {
          clearTimeout(joinGameTimeout);

          console.log('Game joined:', players);

          // join the game room to subscribe to its events: [P1_USERNAME]-vs-[P2_USERNAME]
          const roomName = `${players.p1.username}-vs-${players.p2.username}`;
          socket.emit('join-room', roomName);

          socket.on('game-over', (username) => {
            dispatch(loading());

            alert(`${username} has left the game.`);
            socket.emit('end-game', roomName);

            dispatch(appActions.changePage(APP_PAGES.MENU));
            dispatch(reset());
            dispatch(loaded());
          });

          // set player colors
          players.p1.color = players.p1.settings.color;
          players.p2.color = players.p2.settings.color === players.p1.color ? players.p2.settings.altColor : players.p2.settings.color;

          // initialize the game
          const settings = {
            mode: GAME_MODES.ONLINE,
            roomName: roomName,
            boardSize: players.p1.settings.boardSize,
            timeLimit: players.p1.settings.timeLimit,
          };
          const game = new Game(settings);
          game.initializeGame(players.p1, players.p2);
          dispatch(setGame(game));
          dispatch(appActions.changePage(APP_PAGES.GAME));

          dispatch(closeRequestModal());
          dispatch(endGameRequest());
        });

        // wait up to 20 seconds for opponent
        joinGameTimeout = window.setTimeout(() => {
          dispatch(closeRequestModal());
          dispatch(endGameRequest());
          alert('Game request timeout.');
        }, 15000);

        // emit the game request
        socket.emit('setup-game', { p1: player1, p2: player2 });
      }
    });

    // update the game object in state and save stats if game over
    socket.on('game-update', (updatedGame) => {
      dispatch(loading());
      dispatch(setGame(updatedGame));
      if (updatedGame.gameOver) {
        // show gameResultsModal
        setTimeout(() => {
          dispatch(openResultsModal());
        }, 1500);
        // save stats
        dispatch(userActions.saveStats());
      }
      dispatch(loaded());
    });
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

export function playOnlineAgain() {
  return function (dispatch, getState) {
    dispatch(loading());
    // initialize new game
    const settings = {
      mode: GAME_MODES.ONLINE,
      roomName: getState().game.roomName,
      boardSize: getState().game.boardSize,
      timeLimit: getState().game.timeLimit,
    };
    const players = Object.assign({}, getState().game.players);
    const usernames = Object.keys(players);
    const game = new Game(settings);

    console.log('Playing again with players:', players);

    const p1 = players[usernames[1]];
    const p2 = players[usernames[0]];

    console.log('P1:', p1);
    console.log('P2:', p2);
    
    game.initializeGame(p1, p2);
    dispatch(setGame(game));
    dispatch(appActions.changePage(APP_PAGES.GAME));
    dispatch(closeResultsModal());
    dispatch(loaded());
  }
}

export function endGame() {
  return function(dispatch, getState) {
    dispatch(loading());

    const gameMode = getState().game.mode;
    const roomName = getState().game.roomName;

    dispatch(reset());
    dispatch(appActions.changePage(APP_PAGES.MENU));
    dispatch(loaded());

    if (gameMode === GAME_MODES.ONLINE) {
      const socket = socketUtility.socket;
      socket.emit('end-game', roomName);
    }
  }
}

export function handleJoinedGame(players) {
  return function(dispatch) {
    const socket = socketUtility.socket;

    console.log('Game joined:', players);

    // join the game room to subscribe to its events: [P1_USERNAME]-vs-[P2_USERNAME]
    const roomName = `${players.p1.username}-vs-${players.p2.username}`;
    socket.emit('join-room', roomName);

    // update the game object in state and save stats if game over
    socket.on('game-update', (updatedGame) => {
      dispatch(loading());
      dispatch(setGame(updatedGame));
      if (updatedGame.gameOver) {
        // show gameResultsModal
        setTimeout(() => {
          dispatch(openResultsModal());
        }, 1500);
        // save stats
        dispatch(userActions.saveStats());
      }
      dispatch(loaded());
    });

    socket.on('game-over', (username) => {
      dispatch(loading());

      alert(`${username} has left the game.`);
      socket.emit('end-game', roomName);

      dispatch(appActions.changePage(APP_PAGES.MENU));
      dispatch(reset());
      dispatch(loaded());
    });

    // set player colors
    players.p1.color = players.p1.settings.color;
    players.p2.color = players.p2.settings.color === players.p1.color ? players.p2.settings.altColor : players.p2.settings.color;

    // initialize the game
    const settings = {
      mode: GAME_MODES.ONLINE,
      roomName: roomName,
      boardSize: players.p1.settings.boardSize,
      timeLimit: players.p1.settings.timeLimit,
    };
    const game = new Game(settings);
    game.initializeGame(players.p1, players.p2);
    dispatch(setGame(game));
    dispatch(appActions.changePage(APP_PAGES.GAME));
  }
}

export function cancelGameRequest() {
  return function(dispatch, getState) {
    dispatch(endGameRequest());
    clearTimeout(joinGameTimeout);
    dispatch(closeRequestModal());
    
    const socket = socketUtility.socket;
    socket.emit('cancel-game-request', getState().user.username);
  }
}