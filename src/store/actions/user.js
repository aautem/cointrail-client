import axios from 'axios';
import { createAction } from 'redux-actions';
import { API_URL } from '../../utilities/const';
import * as friendsActions from './friends';
import * as messagesActions from './messages';

export const actions = {
  SET_USER: 'user/SET_USER',
  OPEN_SETTINGS_MODAL: 'user/OPEN_SETTINGS_MODAL',
  CLOSE_SETTINGS_MODAL: 'user/CLOSE_SETTINGS_MODAL',
  OPEN_STATS_MODAL: 'user/OPEN_STATS_MODAL',
  CLOSE_STATS_MODAL: 'user/CLOSE_STATS_MODAL',
  LOADING: 'user/LOADING',
  LOADED: 'user/LOADED',
  ERROR: 'user/ERROR',
};

const setUser = createAction(actions.SET_USER, (payload) => payload);
const loading = createAction(actions.LOADING);
const loaded = createAction(actions.LOADED);
const error = createAction(actions.ERROR, (payload) => payload);

export const openSettingsModal = createAction(actions.OPEN_SETTINGS_MODAL);
export const closeSettingsModal = createAction(actions.CLOSE_SETTINGS_MODAL);
export const openStatsModal = createAction(actions.OPEN_STATS_MODAL);
export const closeStatsModal = createAction(actions.CLOSE_STATS_MODAL);

export function initializeUser(user) {
  return function(dispatch) {
    dispatch(loading());

    // Set user on state
    dispatch(setUser(user));

    // load friends and messages
    dispatch(friendsActions.loadFriends(user._id));
    dispatch(messagesActions.loadMessages(user._id));
    dispatch(loaded());
  }
}

export function saveSettings(auth0Id, settings) {
  return function(dispatch) {
    dispatch(loading());

    axios.put(`${API_URL}/api/users/${auth0Id}`, { settings: settings })
      .then((res) => {
        console.log('User updated:', res.data);

        dispatch(setUser(res.data));
        dispatch(loaded());
      })
      .catch((err) => {
        console.error('Error saving user settings:', err);
        dispatch(error('Error saving user settings.'));
      });
  }
}




//////////

export function saveUser(user) {
  return function(dispatch) {
    dispatch(loading());
    axios.put(`${API_URL}/api/users/${user.username}`, { user: user })
    .then((res) => {
      console.log('*** SAVE USER RES ***', res);
      dispatch(loaded());
    })
    .catch((err) => {
      console.log(err);
      dispatch(error('Error saving user.'));
    });
  }
}

export function openModal() {
  return function(dispatch) {
    dispatch({
      type: actions.OPEN_MODAL,
    });
  }
}

export function closeModal() {
  return function(dispatch) {
    dispatch({
      type: actions.CLOSE_MODAL,
    });
  }
}