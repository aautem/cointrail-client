import axios from 'axios';
import { createAction } from 'redux-actions';
import { API_URL } from '../../utilities/const';

export const actions = {
  SET_USER: 'user/SET_USER',
  OPEN_MODAL: 'user/OPEN_MODAL',
  CLOSE_MODAL: 'user/CLOSE_MODAL',
  LOADING: 'user/LOADING',
  LOADED: 'user/LOADED',
  ERROR: 'user/ERROR',
};

const loading = createAction(actions.LOADING);
const loaded = createAction(actions.LOADED);
const error = createAction(actions.ERROR, (payload) => payload);

export const setUser = createAction(actions.SET_USER, (payload) => payload);

export function saveUser(user) {
  return function(dispatch) {
    dispatch(loading());
    axios.put(`${API_URL}/api/user/${user.username}`, { user: user })
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