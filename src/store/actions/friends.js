import axios from 'axios';
import { createAction } from 'redux-actions';
import { API_URL } from '../../utilities/const';
import * as messagesActions from './messages';

export const actions = {
  SET_FRIENDS: 'friends/SET_FRIENDS',
  OPEN_MODAL: 'friends/OPEN_MODAL',
  CLOSE_MODAL: 'friends/CLOSE_MODAL',
  LOADING: 'friends/LOADING',
  LOADED: 'friends/LOADED',
  ERROR: 'friends/ERROR',
};

const setFriends = createAction(actions.SET_FRIENDS, (payload) => payload);
const openModal = createAction(actions.OPEN_MODAL);
const closeModal = createAction(actions.CLOSE_MODAL);
const loading = createAction(actions.LOADING);
const loaded = createAction(actions.LOADED);
const error = createAction(actions.ERROR, (payload) => payload);

export function loadFriends(userId) {
  return function(dispatch) {
    dispatch(loading());
    axios.get(`${API_URL}/api/friends/${userId}`)
      .then((res) => {
        console.log('Friends:', res.data);
        dispatch(setFriends(res.data));
        dispatch(loaded());
      })
      .catch((err) => {
        console.log('Error loading friends:', err);
        dispatch(error('Error loading friends.'));
      });
  }
}

export function acceptFriendRequest(message) {
  return function(dispatch, getState) {    
    dispatch(loading());
    const friends = [message.fromUserId, message.toUserId];

    axios.post(`${API_URL}/api/friends`, friends)
    .then((res) => {
      console.log('Friends list:', res.data);

      // Load new friends
      dispatch(loadFriends(getState().user._id));
      // delete the message
      dispatch(messagesActions.deleteMessage(message._id));
      dispatch(loaded());
      alert('Friend request accepted.');
    })
    .catch((err) => {
      console.log('Error adding friends:', err);
      dispatch(error('Error adding friends.'));
    });
  }
}

export function openAddFriendModal() {
  return function(dispatch) {
    dispatch(openModal());
  }
}

export function closeAddFriendModal() {
  return function(dispatch) {
    dispatch(closeModal());
  }
}