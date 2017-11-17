import getInitialState from '../initial-state';
import { actions } from '../actions/messages';

const initialState = getInitialState().messages;

export default function reducer(state = initialState, action) {

  if (action.type === actions.SET_MESSAGES) {
    return Object.assign({}, state, { data: action.payload });
  }

  if (action.type === actions.OPEN_MODAL) {
    return Object.assign({}, state, { showMessagesModal: true });
  }

  if (action.type === actions.CLOSE_MODAL) {
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

  if (action.type === actions.RESET) {
    return Object.assign({}, state, { sendingMessage: false, replying: false, message: '', toUsername: null });
  }

  if (action.type === actions.SET_MESSAGE) {
    return Object.assign({}, state, { message: action.payload });
  }

  if (action.type === actions.SET_RECIPIENT) {
    return Object.assign({}, state, { toUsername: action.payload });
  }

  if (action.type === actions.SET_SENDING) {
    return Object.assign({}, state, { sendingMessage: action.payload });
  }

  if (action.type === actions.SET_REPLYING) {
    return Object.assign({}, state, { replying: action.payload });
  }

  return state;
};