import axios from 'axios';
import { createAction } from 'redux-actions';
import Auth0 from 'react-native-auth0';
import * as appActions from './app';
import * as userActions from './user';
import { APP_PAGES, API_URL } from '../../utilities/const';
import socketUtility from '../../utilities/socket';

export const actions = {
  SET_TOKEN: 'auth/SET_TOKEN',
  LOADING: 'auth/LOADING',
  LOADED: 'auth/LOADED',
  ERROR: 'auth/ERROR',
  RESET: 'auth/RESET',
};

const setToken = createAction(actions.SET_TOKEN, (payload) => payload);
const loading = createAction(actions.LOADING);
const loaded = createAction(actions.LOADED);
const error = createAction(actions.ERROR, (payload) => payload);
const reset = createAction(actions.RESET);

// Launch the Auth0 login modal
export function launchAuth0(config) {
  return function(dispatch) {
    dispatch(loading());
    if (!config) {
      dispatch(error('Config file not found.'));
    } else {
      const auth0 = new Auth0({
        domain: config.auth0Domain,
        clientId: config.auth0Id,
      });
      auth0.webAuth.authorize({
        scope: 'openid profile email',
        audience: 'https://app77626749.auth0.com/userinfo'
      }).then((res) => {
        if (res.accessToken) {
          dispatch(setToken(res.accessToken));
          auth0.auth.userInfo({ token: res.accessToken }).then((user) => {
            console.log('Auth0 user:', user);

            if (user.nickname && user.sub) {
              // start socket connection
              socketUtility.createSocketConnection();
              const socket = socketUtility.socket;
              // Listen for players coming online
              socket.on('online-players-update', (onlinePlayers) => {
                // CHECK IF THAT PLAYER IS/WAS A FRIEND!
                dispatch(appActions.upsertOnlinePlayers(onlinePlayers));
              });
              // Listen for successful connection
              socket.on('user-request', (socketId, respond) => {
                const player = {
                  username: user.nickname,
                  auth0Id: user.sub,
                  socketId: socketId,
                  avatarUrl: user.picture,
                  online: true,
                };
                // Send user data back to socket server
                respond(player);

                // upsert user to database
                axios.put(`${API_URL}/api/users/${player.auth0Id}`, player)
                  .then((res) => {
                    console.log('Database user:', res.data);

                    dispatch(userActions.initializeUser(res.data));
                    dispatch(appActions.changePage(APP_PAGES.MENU));
                    dispatch(loaded());
                  })
                  .catch((err) => {
                    // TODO: Close socket connection
                    console.error('Error loading user from database:', err);
                    dispatch(reset());
                    dispatch(error('Error loading user from database.'));
                  });
              });
            } else {
              dispatch(reset());
              dispatch(error('User data not found.'));
            }
          });
        } else {
          dispatch(error('Authentication token not found.'));
        }
      }).catch((err) => {
        console.log('Authentication error:', err);
        dispatch(error(err.error_description));
      });
    }
  }
}

// TODO: implement the Auth0 logout method
export function logout() {
  return function(dispatch) {
    dispatch(userActions.resetUser());
    dispatch(reset());
    dispatch(appActions.resetApp());
  }
}