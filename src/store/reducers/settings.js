import getInitialState from '../initial-state';
import { actions } from '../actions/settings';

const initialState = getInitialState().user.settings;

export default function reducer(state = initialState, action) {

  if (action.type === actions.SET_SETTINGS) {
    return Object.assign({}, state, action.payload);
  }

  if (action.type === actions.OPEN_MODAL) {
    return Object.assign({}, state, { showModal: true });
  }
  
  if (action.type === actions.CLOSE_MODAL) {
    return Object.assign({}, state, { showModal: false });
  }

  if (action.type === actions.SET_SIZE) {
    return Object.assign({}, state, { boardSize: action.payload });
  }

  if (action.type === actions.SET_TIMER) {
    const timeLimit = !state.timeLimit;
    return Object.assign({}, state, { timeLimit: timeLimit });
  }

  if (action.type === actions.SET_COLOR) {
    return Object.assign({}, state, { color: action.payload });
  }

  if (action.type === actions.SET_ALT_COLOR) {
    return Object.assign({}, state, { altColor: action.payload });
  }

  if (action.type === actions.LOADING) {
    return Object.assign({}, state, { loading: true, loaded: false });
  }

  if (action.type === actions.LOADED) {
    return Object.assign({}, state, { loading: false, loaded: true });
  }

  if (action.type === actions.ERROR) {
    return Object.assign({}, state, { loading: false, error: action.payload });
  }

  return state;
};