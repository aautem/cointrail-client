import axios from 'axios';
import { createAction } from 'redux-actions';
import { API_URL } from '../../utilities/const';

export const actions = {
  SET_FRIENDS: 'friends/SET_FRIENDS',
  LOADING: 'friends/LOADING',
  LOADED: 'friends/LOADED',
  ERROR: 'friends/ERROR',
};

const setFriends = createAction(actions.SET_FRIENDS, (payload) => payload);
const loading = createAction(actions.LOADING);
const loaded = createAction(actions.LOADED);
const error = createAction(actions.ERROR, (payload) => payload);

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