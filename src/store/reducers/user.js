import getInitialState from '../initial-state';
import { actions } from '../actions/user';

const initialState = getInitialState().user;

export default function reducer(state = initialState, action) {
  
  if (action.type === actions.OPEN_MODAL) {
    return Object.assign({}, state, { showModal: true });
  }
  
  if (action.type === actions.CLOSE_MODAL) {
    return Object.assign({}, state, { showModal: false });
  }

  return state;
};