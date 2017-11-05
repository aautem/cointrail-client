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
      auth0.auth.userInfo({ token: token.accessToken }).then((user) => {
        console.log('*** USER ***', user);

        // response = {
        //   "email": "autem.alex@gmail.com",
        //   "emailVerified": true,
        //   "name": "autem.alex@gmail.com",
        //   "nickname": "aautem",
        //   "picture": "https://s.gravatar.com/avatar/ed70ccead677f6d59ba3edac7d3acb64?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fau.png",
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
      const errMsg = JSON.parse(errString).message || 'Login error';

      console.warn('Login error:', errMsg);

      dispatch(error(errMsg));
    });
  }
}