import axios from 'axios';
import { createAction } from 'redux-actions';
import { API_URL } from '../../utilities/const';
import * as userActions from './user';

export const actions = {
  SET_LEADERBOARD: 'leaderboard/SET_LEADERBOARD',
  OPEN_MODAL: 'leaderboard/OPEN_MODAL',
  CLOSE_MODAL: 'leaderboard/CLOSE_MODAL',
  LOADING: 'leaderboard/LOADING',
  LOADED: 'leaderboard/LOADED',
  ERROR: 'leaderboard/ERROR',
};

const setLeaderboard = createAction(actions.SET_LEADERBOARD, (payload) => payload);
const openModal = createAction(actions.OPEN_MODAL);
const closeModal = createAction(actions.CLOSE_MODAL);
const loading = createAction(actions.LOADING);
const loaded = createAction(actions.LOADED);
const error = createAction(actions.ERROR, (payload) => payload);

export function openLeaderboardModal() {
  return function(dispatch) {
    dispatch(loadLeaderboard());
    dispatch(openModal());
  }
}

export function loadLeaderboard() {
  return function(dispatch) {
    dispatch(loading());
    axios.get(`${API_URL}/api/leaderboard`)
      .then((res) => {
        console.log('Leaderboard:', res.data);
        dispatch(setLeaderboard(res.data));
        dispatch(loaded());
      })
      .catch((err) => {
        console.log('Error loading leaderboard:', err);
        dispatch(error('Error loading leaderboard.'));
      });
  }
}

export function closeLeaderboardModal() {
  return function(dispatch) {
    dispatch(closeModal());
  }
}