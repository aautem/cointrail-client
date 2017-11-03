import getInitialState from '../initial-state';

const initialState = getInitialState().auth;

export default function reducer(state = initialState, action) {
  
  if (action.type === 'LOGIN') {
    return { view: action.payload };
  }

  return state;
};