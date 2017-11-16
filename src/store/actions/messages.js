import axios from 'axios';
import { createAction } from 'redux-actions';
import { API_URL } from '../../utilities/const';
import * as friendsActions from './friends';

export const actions = {
  SET_MESSAGES: 'messages/SET_MESSAGES',
  OPEN_MODAL: 'messages/OPEN_MODAL',
  CLOSE_MODAL: 'messages/CLOSE_MODAL',
  LOADING: 'messages/LOADING',
  LOADED: 'messages/LOADED',
  ERROR: 'messages/ERROR',
};

const setMessages = createAction(actions.SET_MESSAGES, (payload) => payload);
const openModal = createAction(actions.OPEN_MODAL);
const closeModal = createAction(actions.CLOSE_MODAL);
const loading = createAction(actions.LOADING);
const loaded = createAction(actions.LOADED);
const error = createAction(actions.ERROR, (payload) => payload);

export function loadMessages(userId) {
  return function(dispatch) {
    dispatch(loading());
    axios.get(`${API_URL}/api/messages/${userId}`)
      .then((res) => {
        console.log('Messages:', res.data);
        dispatch(setMessages(res.data));
        dispatch(loaded());
      })
      .catch((err) => {
        console.log('Error loading messages:', err);
        dispatch(error('Error loading messages.'));
      });
  }
}

export function sendFriendRequest(username) {
  return function(dispatch, getState) {
    dispatch(loading());

    const message = {
      type: 'friend',
      toUsername: username,
      fromUserId: getState().user._id,
      fromUsername: getState().user.username,
      message: `${getState().user.username} wants to be your friend!`,
    };

    axios.post(`${API_URL}/api/messages`, message)
      .then((res) => {
        console.log('Friend Request Response:', res.data);

        dispatch(loaded());
        dispatch(friendsActions.closeAddFriendModal());
        alert('Friend request sent.');
      })
      .catch((err) => {
        console.log('Error sending friend request:', err);
        dispatch(error('Error sending friend request'));
      });
  }
}

export function deleteMessage(messageId) {
  return function(dispatch, getState) {
    dispatch(loading());

    axios.delete(`${API_URL}/api/messages/${messageId}`)
      .then((res) => {
        console.log('Message deleted:', res.data);
        // load updated messages
        dispatch(loadMessages(getState().user._id));
        dispatch(loaded());
      })
      .catch((err) => {
        console.log('Error deleting message:', err);
        dispatch(error('Error deleting message.'));
      });
  }
}

export function openMessagesModal() {
  return function(dispatch, getState) {
    dispatch(loadMessages(getState().user._id));
    dispatch(openModal());
  }
}

export function closeMessagesModal() {
  return function(dispatch) {
    dispatch(closeModal());
  }
}