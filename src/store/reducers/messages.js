import getInitialState from '../initial-state';
import { actions } from '../actions/messages';

const initialState = getInitialState().messages;

export default function reducer(state = initialState, action) {

  if (action.type === actions.SET_MESSAGES) {
    return Object.assign({}, state, { data: action.payload.messages });
  }

  if (action.type === actions.SHOW_MODAL) {
    return Object.assign({}, state, { showMessagesModal: true });
  }

  if (action.type === actions.HIDE_MODAL) {
    return Object.assign({}, state, { showMessagesModal: false });
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