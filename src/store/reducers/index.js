import { combineReducers } from 'redux';
import app from './app';
import auth from './auth';
import user from './user';
import friends from './friends';
import messages from './messages';
import game from './game';
import leaderboard from './leaderboard';

export default combineReducers({
  app,
  auth,
  user,
  friends,
  messages,
  game,
  leaderboard,
});