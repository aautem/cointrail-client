import getInitialState from '../initial-state';
import { actions } from '../actions/user';

const initialState = getInitialState().user;

export default function reducer(state = initialState, action) {

  if (action.type === actions.SET_USER) {
    return Object.assign({}, state, action.payload);
  }
  
  if (action.type === actions.OPEN_MODAL) {
    return Object.assign({}, state, { showModal: true });
  }
  
  if (action.type === actions.CLOSE_MODAL) {
    return Object.assign({}, state, { showModal: false });
  }

  if (action.type === actions.LOADING) {
    return Object.assign({}, state, { loading: true, loaded: false });
  }

  if (action.type === actions.LOADED) {
    return Object.assign({}, state, { loading: false, loaded: true });
  }

  if (action.type === actions.ERROR) {
    return Object.assign({}, state, { error: action.payload });
  }

  return state;
};