import getInitialState from '../initial-state';

const initialState = getInitialState().series;

export default function reducer(state = initialState, action) {
  
  if (action.type === 'UPDATE_RESULTS') {
    return { results: action.payload };
  }

  return state;
};