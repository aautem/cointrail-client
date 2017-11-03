import getInitialState from '../initial-state';

const initialState = getInitialState().leaderboard;

export default function reducer(state = initialState, action) {
  
  if (action.type === 'LOAD_LEADERBOARD') {
    return { data: action.payload };
  }

  return state;
};