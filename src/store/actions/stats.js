import axios from 'axios';
import { createAction } from 'redux-actions';
import { API_URL } from '../../utilities/const';

export const actions = {
  SET_STATS: 'user/SET_STATS',
  LOADING: 'user/LOADING',
  LOADED: 'user/LOADED',
  ERROR: 'user/ERROR',
};

const setStats = createAction(actions.SET_STATS, (payload) => payload);
const loading = createAction(actions.LOADING);
const loaded = createAction(actions.LOADED);
const error = createAction(actions.ERROR, (payload) => payload);

export function loadStats(username) {
  return function(dispatch) {
    dispatch(loading());
    axios.get(`${API_URL}/api/stats/${username}`).then((res) => {
      dispatch(setStats(res.data));
      dispatch(loaded());
    }).catch((err) => {
      dispatch(error('Error loading stats.'));
    });
  }
}