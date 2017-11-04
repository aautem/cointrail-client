import getInitialState from '../initial-state';
import { actions } from '../actions/app';

const initialState = getInitialState().app;

export default function reducer(state = initialState, action) {
  
  if (action.type === actions.CHANGE_PAGE) {
    return Object.assign({}, state, { page: action.payload });
  }

  return state;
};