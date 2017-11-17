import axios from 'axios';
import { createAction } from 'redux-actions';
import { API_URL } from '../../utilities/const';

export const actions = {
  ROUTE: 'app/ROUTE',
  UPSERT_PLAYERS: 'app/UPSERT_PLAYERS',
  SET_CONFIG: 'app/SET_CONFIG',
  LOADING: 'app/LOADING',
  LOADED: 'app/LOADED',
  ERROR: 'app/ERROR',
  RESET: 'app/RESET',
};

const route = createAction(actions.ROUTE, (payload) => payload);
const upsertPlayers = createAction(actions.UPSERT_PLAYERS, (payload) => payload);
const setConfig = createAction(actions.SET_CONFIG, (payload) => payload);
const loading = createAction(actions.LOADING);
const loaded = createAction(actions.LOADED);
const error = createAction(actions.ERROR, (payload) => payload);
const reset = createAction(actions.RESET);

export function changePage(page) {
  return function(dispatch) {
    dispatch(route(page));
  }
}

export function loadConfig() {
  return function(dispatch) {
    dispatch(loading());
    axios.get(`${API_URL}/config/client`)
      .then((res) => {
        dispatch(setConfig(res.data));
        dispatch(loaded());
      })
      .catch((err) => {
        console.warn('Config Error:', err);
        dispatch(error('Configuration error.'));
      });
  }
}

export function upsertOnlinePlayers(onlinePlayers) {
  return function(dispatch) {
    dispatch(upsertPlayers(onlinePlayers));
  }
}

export function resetApp() {
  return function(dispatch) {
    dispatch(reset());
  }
}