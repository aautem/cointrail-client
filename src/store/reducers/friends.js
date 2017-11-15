import getInitialState from '../initial-state';
import { actions } from '../actions/friends';

const initialState = getInitialState().friends;

export default function reducer(state = initialState, action) {

  if (action.type === actions.SET_FRIENDS) {
    return Object.assign({}, state, { data: action.payload });
  }

  // if (action.type === actions.SHOW_MODAL) {
  //   return Object.assign({}, state, { showAddFriendModal: true });
  // }

  // if (action.type === actions.HIDE_MODAL) {
  //   return Object.assign({}, state, { showAddFriendModal: false });
  // }

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