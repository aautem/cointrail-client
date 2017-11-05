import { combineReducers } from 'redux';
import app from './app';
import auth from './auth';
import user from './user';
import series from './series';
import game from './game';
import opponent from './opponent';
import leaderboard from './leaderboard';
import messages from './messages';
import friends from './friends';
import history from './history';
import settings from './settings';

export default combineReducers({
  app,
  auth,
  user,
  series,
  game,
  opponent,
  leaderboard,
  messages,
  friends,
  history,
  settings,
});