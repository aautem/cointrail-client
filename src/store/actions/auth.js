import { createAction } from 'redux-actions';
import * as appActions from './app';
import * as userActions from './user';
import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({ domain: 'app77626749.auth0.com', clientId: 'z2xIFUI0P4OLA4S_uJ2CADCe3A2AKsH5' });

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
  return function(dispatch) {
    dispatch(loading());

    const params = {
      username: username,
      password: password,
      realm: 'Username-Password-Authentication',
    };

    // returns an auth token
    auth0.auth.passwordRealm(params).then((token) => {
      console.log('*** TOKEN ***', token);

      auth0.auth.userInfo({ token: token.accessToken }).then((user) => {
        console.log('*** USER FOUND ***', user);

        // EXAMPLE RESPONSE: {
        //   "email": "autem.alex@gmail.com",
        //   "emailVerified": true,
        //   "name": "autem.alex@gmail.com",
        //   "nickname": "aautem",
        //   "picture": "https://s.gravatar.com/avatar/auth0.png",
        //   "sub": "auth0|59fe6a116be939112c29137d",
        //   "updatedAt": "2017-11-05T02:19:16.652Z",
        // };

        const player = {
          id: null,
          username: user.nickname,
          avatar: user.picture,
        };

        dispatch(userActions.setUser(player));
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

export function createUser(email, username, password) {
  return function(dispatch) {
    dispatch(loading());

    const params = {
      email: email,
      username: username,
      password: password,
      connection: 'Username-Password-Authentication',
    };

    auth0.auth.createUser(params).then((user) => {
      console.log('*** USER CREATED ***', user);

      // EXAMPLE RESPONSE: {
      //   "Id": "59fe8c96b84acc463c6e9713",
      //   "email": "aautem@trifinlabs.com",
      //   "emailVerified": false,
      //   "username": "aautem",
      // };

      dispatch(login(username, password));
    }).catch((err) => {
      const errString = JSON.stringify(err);
      const errMsg = JSON.parse(errString).message || 'signup error';

      console.warn('Signup Error:', errMsg);

      dispatch(error(errMsg));
    });
  }
}