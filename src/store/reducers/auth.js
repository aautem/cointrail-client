import getInitialState from '../initial-state';
import { actions } from '../actions/auth';

const initialState = getInitialState().auth;

export default function reducer(state = initialState, action) {

  if (action.type === actions.SET_TOKEN) {
    return Object.assign({}, state, { accessToken: action.payload });
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