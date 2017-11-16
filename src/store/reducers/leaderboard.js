import getInitialState from '../initial-state';
import { actions } from '../actions/leaderboard';

const initialState = getInitialState().leaderboard;

export default function reducer(state = initialState, action) {

  if (action.type === actions.SET_LEADERBOARD) {
    return Object.assign({}, state, { data: action.payload });
  }

  if (action.type === actions.OPEN_MODAL) {
    return Object.assign({}, state, { showLeaderboardModal: true });
  }

  if (action.type === actions.CLOSE_MODAL) {
    return Object.assign({}, state, { showLeaderboardModal: false });
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