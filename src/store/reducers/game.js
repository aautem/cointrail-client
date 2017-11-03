import getInitialState from '../initial-state';

const initialState = getInitialState().game;

export default function reducer(state = initialState, action) {
  
  if (action.type === 'DROP_COIN') {
    return { board: action.payload };
  }

  return state;
};