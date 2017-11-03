import getInitialState from '../initial-state';

const initialState = getInitialState().history;

export default function reducer(state = initialState, action) {
  
  if (action.type === 'LOAD_HISTORY') {
    return { data: action.payload };
  }

  return state;
};