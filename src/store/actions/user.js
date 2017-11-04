// import axios from 'axios';

export const actions = {
  OPEN_MODAL: 'user/OPEN_MODAL',
  CLOSE_MODAL: 'user/CLOSE_MODAL',
  LOADING: 'user/LOADING',
  LOADED: 'user/LOADED',
  ERROR: 'user/ERROR',
};

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