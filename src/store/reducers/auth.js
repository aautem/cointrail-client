import getInitialState from '../initial-state';
import { actions } from '../actions/auth';

const initialState = getInitialState().auth;

export default function reducer(state = initialState, action) {

  if (action.type === actions.CHANGE_PAGE) {
    return Object.assign({}, state, { page: action.payload, error: null });
  }

  if (action.type === actions.LOADING) {
    return Object.assign({}, state, { loading: true, authenticated: false, error: null });
  }

  if (action.type === actions.AUTHENTICATED) {
    return Object.assign({}, state, { loading: false, authenticated: true, error: null });
  }

  if (action.type === actions.ERROR) {
    return Object.assign({}, state, { loading: false, authenticated: false, error: action.payload });
  }

  return state;
};