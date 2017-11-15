import axios from 'axios';
import { createAction } from 'redux-actions';
import { API_URL } from '../../utilities/const';

export const actions = {
  SET_SETTINGS: 'settings/SET_SETTINGS',
  OPEN_MODAL: 'settings/OPEN_MODAL',
  CLOSE_MODAL: 'settings/CLOSE_MODAL',
  SET_SIZE: 'settings/SET_SIZE',
  SET_LENGTH: 'settings/SET_LENGTH',
  SET_TIMER: 'settings/SET_TIMER',
  SET_COLOR: 'settings/SET_COLOR',
  SET_ALT_COLOR: 'settings/SET_ALT_COLOR',
  LOADING: 'settings/LOADING',
  LOADED: 'settings/LOADED',
  ERROR: 'settings/ERROR',
};

const setSettings = createAction(actions.SET_SETTINGS, (payload) => payload);
const loading = createAction(actions.LOADING);
const loaded = createAction(actions.LOADED);
const error = createAction(actions.ERROR, (payload) => payload);
const setSize = createAction(actions.SET_SIZE, (payload) => payload);
const setLength = createAction(actions.SET_LENGTH, (payload) => payload);
const setTimer = createAction(actions.SET_TIMER, (payload) => payload);
const setColor = createAction(actions.SET_COLOR, (payload) => payload);
const setAltColor = createAction(actions.SET_ALT_COLOR, (payload) => payload);

export function saveSettings(username, settings) {
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

export function changeSize(size) {
  return function(dispatch) {
    dispatch(setSize(size));
  }
}

export function changeLength(length) {
  return function(dispatch) {
    dispatch(setLength(length));
  }
}

export function toggleTimer() {
  return function(dispatch) {
    dispatch(setTimer());
  }
}

export function changeColor(color) {
  return function(dispatch) {
    dispatch(setColor(color));
  }
}

export function changeAltColor(color) {
  return function(dispatch) {
    dispatch(setAltColor(color));
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