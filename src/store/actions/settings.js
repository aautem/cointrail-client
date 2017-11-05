import axios from 'axios';
import { createAction } from 'redux-actions';
import { API_URL } from '../../utilities/const';

export const actions = {
  SET_SETTINGS: 'settings/SET_SETTINGS',
  OPEN_MODAL: 'settings/OPEN_MODAL',
  CLOSE_MODAL: 'settings/CLOSE_MODAL',
  CHANGE_SIZE: 'settings/CHANGE_SIZE',
  CHANGE_LENGTH: 'settings/CHANGE_LENGTH',
  TOGGLE_TIMER: 'settings/TOGGLE_TIMER',
  LOADING: 'settings/LOADING',
  LOADED: 'settings/LOADED',
  ERROR: 'settings/ERROR',
};

const setSettings = createAction(actions.SET_SETTINGS, (payload) => payload);
const loading = createAction(actions.LOADING);
const loaded = createAction(actions.LOADED);
const error = createAction(actions.ERROR, (payload) => payload);

export function loadSettings(username) {
  return function(dispatch) {
    dispatch(loading());
    axios.get(`${API_URL}/api/settings/${username}`).then((res) => {
      dispatch(setSettings(res.data));
      dispatch(loaded());
    }).catch((err) => {
      console.warn('Error loading settings:', err);
      dispatch(error('Error loading settings'));
    });
  }
}

export function updateSettings(username, settings) {
  return function(dispatch) {
    dispatch(loading());
    axios.put(`${API_URL}/api/settings/${username}`, {
      settings: settings
    })
    .then((res) => {
      console.log('*** SETTINGS UPDATE RES ***', res);

      dispatch(setSettings(res.data));
      dispatch(loaded());
      dispatch({
        type: actions.CLOSE_MODAL,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch(error('Error updating settings'));
      dispatch({
        type: actions.CLOSE_MODAL,
      });
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

export function changeSize(size) {
  return function(dispatch) {
    dispatch({
      type: actions.CHANGE_SIZE,
      payload: size,
    });
  }
}

export function changeLength(length) {
  return function(dispatch) {
    dispatch({
      type: actions.CHANGE_LENGTH,
      payload: length,
    });
  }
}

export function toggleTimer() {
  return function(dispatch) {
    dispatch({
      type: actions.TOGGLE_TIMER,
    });
  }
}