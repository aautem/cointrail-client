import getInitialState from '../initial-state';

const initialState = getInitialState().messages;

export default function reducer(state = initialState, action) {
  
  if (action.type === 'LOAD_MESSAGES') {
    return { data: action.payload };
  }

  return state;
};