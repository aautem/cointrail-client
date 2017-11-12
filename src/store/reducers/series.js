import getInitialState from '../initial-state';
import { actions } from '../actions/series';
import { showResultsModal } from '../actions/game';
const initialState = getInitialState().series;

export default function reducer(state = initialState, action) {

  if (action.type === actions.UPSERT_SERIES) {
    return Object.assign({}, state, action.payload);
  }

  if (action.type === actions.RESET) {
    return Object.assign({}, getInitialState().series);
  }

  if (action.type === actions.SHOW_MODAL) {
    return Object.assign({}, state, { showResultsModal: true })
  }

  if (action.type === actions.HIDE_MODAL) {
    return Object.assign({}, state, { showResultsModal: false })
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

  return state;
};