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

export function saveStats(game) {
  return function(dispatch, getState) {
    dispatch(loading());

    const username = getState().user.username;
    const stats = Object.assign({}, getState().stats);
    stats.gamesPlayed += 1;
    stats.totalPoints += game.players[username].points;

    if (game.winner === username) {
      stats.wins += 1;
      if (game.winByPoints) {
        stats.winsByPoints += 1;
      } else if (game.winByConnect) {
        stats.winsByConnect += 1;
      } else if (game.disconnection) {
        stats.winsByDefault += 1;
      }
    } else if (game.draw) {
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