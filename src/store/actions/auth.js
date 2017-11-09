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

export function login(username, password) {
  return function(dispatch, getState) {
    dispatch(loading());

    const auth0 = new Auth0({
      domain: getState().app.config.auth0Domain,
      clientId: getState().app.config.auth0Id
    });

    auth0.auth.passwordRealm({
      username: username,
      password: password,
      realm: 'Username-Password-Authentication',
    }).then((token) => {

      // {"accessToken": "_Wi99268xpsS36Zya02BWGOQQy-cIkBi",
      //   "expiresIn": 86400,
      //   "idToken": "7OmGU8aN5uejTB-XCUc9X0Ro7b4L0TjPBcpWK6fl6ySUT6H-sSacAQ",
      //   "scope": "openid profile email address phone",
      //   "tokenType": "Bearer"}

      auth0.auth.userInfo({ token: token.accessToken }).then((user) => {

        // EXAMPLE RESPONSE:
        // {"email": "autem.alex@gmail.com",
        // "emailVerified": true,
        // "name": "autem.alex@gmail.com",
        // "nickname": "aautem",
        // "picture": "https://s.gravatar.com/avatar/auth0.png",
        // "sub": "auth0|59fe6a116be939112c29137d",
        // "updatedAt": "2017-11-05T02:19:16.652Z"};

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
      });
    }).catch((err) => {
      const errString = JSON.stringify(err);
      const errMsg = JSON.parse(errString).message || 'login error';
      console.warn('Login Error:', errMsg);
      dispatch(error(errMsg));
    });
  }
}

export function googleLogin() {
  return function(dispatch, getState) {
    dispatch(loading());

    const auth0 = new Auth0({
      domain: getState().app.config.auth0Domain,
      clientId: getState().app.config.auth0Id
    });

    auth0.webAuth.authorize().then((token) => {
      console.log('*** TOKEN ***', token);
    });
  }
}

export function createUser(email, username, password) {
  return function(dispatch) {
    dispatch(loading());

    const auth0 = new Auth0({
      domain: getState().app.config.auth0Domain,
      clientId: getState().app.config.auth0Id
    });

    auth0.auth.createUser({
      email: email,
      username: username,
      password: password,
      connection: 'Username-Password-Authentication',
    }).then((user) => {

      // EXAMPLE RESPONSE:
      // {"Id": "59fe8c96b84acc463c6e9713",
      // "email": "aautem@trifinlabs.com",
      // "emailVerified": false,
      // "username": "aautem"};

      dispatch(login(username, password));
    }).catch((err) => {
      const errString = JSON.stringify(err);
      const errMsg = JSON.parse(errString).message || 'signup error';
      console.warn('Signup Error:', errMsg);
      dispatch(error(errMsg));
    });
  }
}