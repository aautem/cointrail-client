import getInitialState from '../initial-state';

const initialState = getInitialState().opponent;

export default function reducer(state = initialState, action) {
  
  if (action.type === 'GET_OPPONENT') {
    return { id: action.payload };
  }

  return state;
};