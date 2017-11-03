import getInitialState from '../initial-state';

const initialState = getInitialState().friends;

export default function reducer(state = initialState, action) {
  
  if (action.type === 'ADD_FRIEND') {
    return { friend: action.payload };
  }

  return state;
};