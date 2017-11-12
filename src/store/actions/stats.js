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

export function saveStats(series) {
  return function(dispatch, getState) {
    dispatch(loading());

    const username = getState().user.username;
    const stats = Object.assign({}, getState().stats);
    stats.seriesPlayed += 1;
    stats.gamesPlayed += series.gamesPlayed;
    stats.totalPoints += series.players[username].points;

    if (series.winner === username) {
      stats.wins += 1;
      if (series.winByPoints) {
        stats.winsByPoints += 1;
      } else if (series.winByConnect) {
        stats.winsByConnect += 1;
      } else if (series.disconnection) {
        stats.winsByDefault += 1;
      }
    } else if (series.draw) {
      stats.draws += 1;
    } else {
      stats.losses += 1;
    }

    axios.put(`${API_URL}/api/stats/${username}`, {
      stats: stats
    })
    .then((res) => {
      console.log('*** STATS UPDATE RES ***', res);
      dispatch(setStats(res.data));
      dispatch(loaded());
    })
    .catch((err) => {
      console.log(err);
      dispatch(error('Error saving stats.'));
    });
  }
}