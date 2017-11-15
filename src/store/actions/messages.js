import axios from 'axios';
import { createAction } from 'redux-actions';
import { API_URL } from '../../utilities/const';

export const actions = {
  SET_MESSAGES: 'messages/SET_MESSAGES',

  // SHOW_MODAL: 'messages/SHOW_MODAL',
  // HIDE_MODAL: 'messages/HIDE_MODAL',

  LOADING: 'messages/LOADING',
  LOADED: 'messages/LOADED',
  ERROR: 'messages/ERROR',
};

const setMessages = createAction(actions.SET_MESSAGES, (payload) => payload);
const loading = createAction(actions.LOADING);
const loaded = createAction(actions.LOADED);
const error = createAction(actions.ERROR, (payload) => payload);

// const showModal = createAction(actions.SHOW_MODAL);
// const hideModal = createAction(actions.HIDE_MODAL);

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





///////////////////

export function openMessagesModal() {
  return function(dispatch, getState) {
    dispatch(loading());
    dispatch(loadMessages(getState().user.username));
    dispatch(showModal());
    dispatch(loaded());
  }
}

export function closeMessagesModal() {
  return function(dispatch) {
    dispatch(hideModal());
  }
}



export function sendFriendRequest(username) {
  return function(dispatch, getState) {
    dispatch(loading());

    const message = {
      type: 'friend',
      to: username,
      from: getState().user.username,
      msg: `${getState().user.username} wants to be your friend!`,
    }

    axios.post(`${API_URL}/api/messages/${username}`, { message: message })
    .then((res) => {
      console.log('Friend request response:', res);
      dispatch(loaded());
    }).catch((err) => {
      console.warn(err);
      dispatch(error('Error sending friend request.'));
    });
  }
}