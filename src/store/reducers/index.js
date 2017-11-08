import { combineReducers } from 'redux';
import app from './app';
import auth from './auth';
import user from './user';
import settings from './settings';
import stats from './stats';
import series from './series';
import leaderboard from './leaderboard';
import messages from './messages';
import friends from './friends';
import history from './history';
import game from './game';

export default combineReducers({
  app,
  auth,
  user,
  settings,
  stats,
  series,
  leaderboard,
  messages,
  friends,
  history,
  game,
});