import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import stats from './stats';
import series from './series';
import game from './game';
import opponent from './opponent';
import leaderboard from './leaderboard';
import messages from './messages';
import friends from './friends';
import history from './history';

export default combineReducers({
  auth,
  user,
  stats,
  series,
  game,
  opponent,
  leaderboard,
  messages,
  friends,
  history,
});