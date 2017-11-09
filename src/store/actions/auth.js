import { createAction } from 'redux-actions';
import Auth0 from 'react-native-auth0';
import * as appActions from './app';
import * as userActions from './user';
import * as statsActions from './stats';
import * as settingsActions from './settings';
import { API_URL } from '../../utilities/const';
import socketUtility from '../../utilities/socket';

export const actions = {
  CHANGE_PAGE: 'auth/CHANGE_PAGE',
  LOADING: 'auth/LOADING',
  AUTHENTICATED: 'auth/AUTHENTICATED',
  ERROR: 'auth/ERROR',
};

const loading = createAction(actions.LOADING);
const authenticated = createAction(actions.AUTHENTICATED);
const error = createAction(actions.ERROR, (payload) => payload);

export const changePage = createAction(actions.CHANGE_PAGE, (payload) => payload);

export function loginUser(user) {
  return function(dispatch) {
    dispatch(loading());

    if(!user.nickname) {
      dispatch(error('Authentication error: missing profile username'));
    } else {
      // load user stats and settings
      dispatch(statsActions.loadStats(user.nickname));
      dispatch(settingsActions.loadSettings(user.nickname));

      // start socket connection
      socketUtility.createSocketConnection();
      socketUtility.socket.on('user-request', (socketId, respond) => {
        const player = {
          id: socketId,
          username: user.nickname,
          avatarUrl: user.picture,
          inGame: false,
        };
        dispatch(userActions.setUser(player));
        respond(player);
      });

      dispatch(appActions.changePage('menu'));
      dispatch(authenticated());
    }
  }
}