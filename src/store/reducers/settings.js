import getInitialState from '../initial-state';
import { actions } from '../actions/settings';

const initialState = getInitialState().settings;

export default function reducer(state = initialState, action) {

  if (action.type === actions.OPEN_MODAL) {
    return Object.assign({}, state, { showModal: true });
  }
  
  if (action.type === actions.CLOSE_MODAL) {
    return Object.assign({}, state, { showModal: false });
  }

  if (action.type === actions.CHANGE_SIZE) {
    return Object.assign({}, state, { size: action.payload });
  }

  if (action.type === actions.CHANGE_LENGTH) {
    return Object.assign({}, state, { length: action.payload });
  }

  if (action.type === actions.TOGGLE_TIMER) {
    const timer = !state.timer;
    return Object.assign({}, state, { timer: timer });
  }

  return state;
};