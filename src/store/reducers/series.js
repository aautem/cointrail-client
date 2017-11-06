import getInitialState from '../initial-state';
import { actions } from '../actions/series';
const initialState = getInitialState().series;

export default function reducer(state = initialState, action) {

  if (action.type === actions.INITIALIZE_SERIES) {
    return Object.assign({}, state, action.payload);
  }

  if (action.type === actions.UPSERT_GAME) {
    const games = state.games.slice().pop();
    games.push(action.payload);
    return Object.assign({}, state, { games: games });
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