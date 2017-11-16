import getInitialState from '../initial-state';
import { actions } from '../actions/game';
const initialState = getInitialState().game;

export default function reducer(state = initialState, action) {

  if (action.type === actions.SET_GAME) {
    return Object.assign({}, state, action.payload);
  }

  if (action.type === actions.OPEN_RESULTS_MODAL) {
    return Object.assign({}, state, { showResultsModal: true });
  }

  if (action.type === actions.CLOSE_RESULTS_MODAL) {
    return Object.assign({}, state, { showResultsModal: false });
  }

  if (action.type === actions.OPEN_REQUEST_MODAL) {
    return Object.assign({}, state, { showRequestModal: true });
  }

  if (action.type === actions.CLOSE_REQUEST_MODAL) {
    return Object.assign({}, state, { showRequestModal: false });
  }

  if (action.type === actions.START_GAME_REQUEST) {
    return Object.assign({}, state, { requestingGame: true });
  }

  if (action.type === actions.END_GAME_REQUEST) {
    return Object.assign({}, state, { requestingGame: false });
  }

  if (action.type === actions.LOADING) {
    return Object.assign({}, state, { loading: true, loaded: false, error: null });
  }

  if (action.type === actions.LOADED) {
    return Object.assign({}, state, { loading: false, loaded: true, error: null });
  }

  if (action.type === actions.ERROR) {
    return Object.assign({}, state, { loading: false, loaded: false, error: action.payload });
  }

  if (action.type === actions.RESET) {
    return initialState;
  }

  return state;
};