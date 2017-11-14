import { createAction } from 'redux-actions';
import Auth0 from 'react-native-auth0';
import * as appActions from './app';
import * as userActions from './user';
import * as statsActions from './stats';
import * as settingsActions from './settings';
import * as friendsActions from './friends';
import * as messagesActions from './messages';
import { API_URL } from '../../utilities/const';
import socketUtility from '../../utilities/socket';

export const actions = {
  LOADING: 'auth/LOADING',
  LOADED: 'auth/LOADED',
  ERROR: 'auth/ERROR',
};

const loading = createAction(actions.LOADING);
const loaded = createAction(actions.LOADED);
const error = createAction(actions.ERROR, (payload) => payload);

export function launchAuth0(config) {
  return function(dispatch) {
    dispatch(loading());

    if (!config) {
      dispatch(error('Missing app config.'));
    } else {
      const auth0 = new Auth0({
        domain: config.auth0Domain,
        clientId: config.auth0Id,
      });
      
      auth0.webAuth.authorize({
        scope: 'openid profile email',
        audience: 'https://app77626749.auth0.com/userinfo'
      }).then((res) => {
        console.log('*** TOKEN ***', res);
  
        if (res.accessToken) {
          auth0.auth.userInfo({ token: res.accessToken }).then((user) => {
            console.log('*** USER ***', user);
  
            if (user.nickname) {
              dispatch(login(user));
            } else {
              dispatch(error('No username.'));
            }
          });
        } else {
          dispatch(error('No auth token.'));
        }
      }).catch((err) => {
        console.log('AuthError:', err);
        dispatch(error(err.error_description));
      });
    }
  }
}

function login(user) {
  return function(dispatch) {
    dispatch(settingsActions.loadSettings(user.nickname));
    dispatch(statsActions.loadStats(user.nickname));
    dispatch(friendsActions.loadFriends(user.nickname));
    dispatch(messagesActions.loadMessages(user.nickname));

    // start socket connection
    socketUtility.createSocketConnection();

    socketUtility.socket.on('online-players-update', (onlinePlayers) => {
      // check if that player is a friend!
      dispatch(appActions.upsertOnlinePlayers(onlinePlayers));
    });

    socketUtility.socket.on('user-request', (socketId, respond) => {
      const player = {
        id: socketId,
        username: user.nickname,
        avatarUrl: user.picture,
        inGame: false,
      };
      dispatch(userActions.saveUser(player));
      dispatch(userActions.setUser(player));
      respond(player);
    });

    dispatch(appActions.changePage('menu'));
    dispatch(loaded());
  }
}