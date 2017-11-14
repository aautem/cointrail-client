import axios from 'axios';
import { createAction } from 'redux-actions';
import { API_URL } from '../../utilities/const';
import * as messagesActions from './messages';

export const actions = {
  SET_FRIENDS: 'friends/SET_FRIENDS',
  SHOW_MODAL: 'friends/SHOW_MODAL',
  HIDE_MODAL: 'friends/HIDE_MODAL',
  LOADING: 'friends/LOADING',
  LOADED: 'friends/LOADED',
  ERROR: 'friends/ERROR',
};

const setFriends = createAction(actions.SET_FRIENDS, (payload) => payload);
const showModal = createAction(actions.SHOW_MODAL);
const hideModal = createAction(actions.HIDE_MODAL);
const loading = createAction(actions.LOADING);
const loaded = createAction(actions.LOADED);
const error = createAction(actions.ERROR, (payload) => payload);

export function openAddFriendModal() {
  return function(dispatch) {
    dispatch(showModal());
  }
}

export function closeAddFriendModal() {
  return function(dispatch) {
    dispatch(hideModal());
  }
}

export function sendFriendRequest(username) {
  return function(dispatch) {
    dispatch(loading());

    // check that user exists
    axios.get(`${API_URL}/api/user/${username}`).then((res) => {
      console.log('Friend Request Response:', res.data);

      if (res.data === 404) {
        dispatch(error('Username does not exist.'));
      } else {
        dispatch(messagesActions.sendFriendRequest(username));
        dispatch(loaded());
        dispatch(hideModal());
        alert('Friend request sent.');
      }
    }).catch((err) => {
      dispatch(error('Username does not exist.'));
    });
  }
}

export function loadFriends(username) {
  return function(dispatch) {
    dispatch(loading());
    axios.get(`${API_URL}/api/friends/${username}`).then((res) => {

      // SORT FRIENDS BY ONLINE STATUS
      // UPDATE ONLINE FRIENDS COUNT IN STATE

      dispatch(setFriends(res.data));
      dispatch(loaded());
    }).catch((err) => {
      dispatch(error('Error loading friends.'));
    });
  }
}

export function saveFriends(friends) {
  return function(dispatch, getState) {
    dispatch(loading());
    const username = getState().user.username;
    axios.put(`${API_URL}/api/friends/${username}`, {
      friends: friends
    })
    .then((res) => {
      console.log('*** FRIENDS UPDATE RES ***', res);
      dispatch(setFriends(res.data));
      dispatch(loaded());
    })
    .catch((err) => {
      console.log(err);
      dispatch(error('Error saving friends.'));
    });
  }
}