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
  RESET: 'messages/RESET',

  SET_MESSAGE: 'messages/SET_MESSAGE',
  SET_RECIPIENT: 'messages/SET_RECIPIENT',
  SET_SENDING: 'messages/SET_SENDING',
  SET_REPLYING: 'messages/SET_REPLYING',
};

const setMessages = createAction(actions.SET_MESSAGES, (payload) => payload);
const openModal = createAction(actions.OPEN_MODAL);
const closeModal = createAction(actions.CLOSE_MODAL);
const loading = createAction(actions.LOADING);
const loaded = createAction(actions.LOADED);
const error = createAction(actions.ERROR, (payload) => payload);
const reset = createAction(actions.RESET);

export const setMessage = createAction(actions.SET_MESSAGE, (payload) => payload);
export const setRecipient = createAction(actions.SET_RECIPIENT, (payload) => payload);
export const setSending = createAction(actions.SET_SENDING, (payload) => payload);
export const setReplying = createAction(actions.SET_REPLYING, (payload) => payload);

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

export function sendMessage(message) {
  return function(dispatch) {
    dispatch(loading());
    axios.post(`${API_URL}/api/messages`, message)
    .then((res) => {
      console.log('Message sent:', res.data);

      dispatch(loaded());
      alert(`Message sent to ${message.toUsername}.`);
    })
    .catch((err) => {
      console.log('Error sending message:', err);
      dispatch(error('Error sending message'));
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

export function resetMessage() {
  return function(dispatch) {
    dispatch(reset());
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