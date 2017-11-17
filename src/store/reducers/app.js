import getInitialState from '../initial-state';
import { actions } from '../actions/app';

const initialState = getInitialState().app;

export default function reducer(state = initialState, action) {

  if (action.type === actions.ROUTE) {
    return Object.assign({}, state, { page: action.payload });
  }

  if (action.type === actions.UPSERT_PLAYERS) {
    return Object.assign({}, state, { playersOnline: action.payload, onlineCount: action.payload.length });
  }
  
  if (action.type === actions.SET_CONFIG) {
    return Object.assign({}, state, { config: action.payload });
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
    return Object.assign({}, initialState, { config: state.config });
  }

  return state;
};