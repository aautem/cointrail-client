import getInitialState from '../initial-state';

const initialState = getInitialState().stats;

export default function reducer(state = initialState, action) {
  
  if (action.type === 'LOAD_STATS') {
    return { data: action.payload };
  }

  return state;
};