import { createAction } from 'redux-actions';

export const actions = {
  OPEN_MODAL: 'settings/OPEN_MODAL',
  CLOSE_MODAL: 'settings/CLOSE_MODAL',
  CHANGE_SIZE: 'settings/CHANGE_SIZE',
  CHANGE_LENGTH: 'settings/CHANGE_LENGTH',
  TOGGLE_TIMER: 'settings/TOGGLE_TIMER',
  LOADING: 'settings/LOADING',
  LOADED: 'settings/LOADED',
  ERROR: 'settings/ERROR',
};

// export const openModal = createAction(actions.OPEN_MODAL);
// export const closeModal = createAction(actions.CLOSE_MODAL);
// export const changeSize = createAction(actions.CHANGE_SIZE, (payload) => payload);
// export const changeLength = createAction(actions.CHANGE_LENGTH, (payload) => payload);
// export const toggleTimer = createAction(actions.TOGGLE_TIMER);

const loading = createAction(actions.LOADING);
const loaded = createAction(actions.LOADED);
const error = createAction(actions.ERROR, (payload) => payload);

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