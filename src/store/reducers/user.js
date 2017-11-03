import getInitialState from '../initial-state';

const initialState = getInitialState().user;

export default function reducer(state = initialState, action) {
  
  if (action.type === 'LOAD_PROFILE') {
    return { profile: action.payload };
  }

  return state;
};