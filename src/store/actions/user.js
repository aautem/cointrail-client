import axios from 'axios';
import { createAction } from 'redux-actions';
import { API_URL } from '../../utilities/const';

export const actions = {
  SET_USER: 'user/SET_USER',
  SET_STATS: 'user/SET_STATS',
  OPEN_MODAL: 'user/OPEN_MODAL',
  CLOSE_MODAL: 'user/CLOSE_MODAL',
  LOADING: 'user/LOADING',
  LOADED: 'user/LOADED',
  ERROR: 'user/ERROR',
};

// export const openModal = createAction(actions.OPEN_MODAL);
// export const closeModal = createAction(actions.CLOSE_MODAL);

const loading = createAction(actions.LOADING);
const loaded = createAction(actions.LOADED);
const error = createAction(actions.ERROR, (payload) => payload);
const setStats = createAction(actions.SET_STATS, (payload) => payload);

export const setUser = createAction(actions.SET_USER, (payload) => payload);

export function loadStats(username) {
  return function(dispatch) {
    dispatch(loading());

    axios.get(`${API_URL}/api/stats/${username}`).then((res) => {
      dispatch(setStats(res.data));
      dispatch(loaded());
    }).catch((err) => {
      console.warn('Error loading stats:', err);
      dispatch(error('Error loading stats'));
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