import axios from 'axios';
import { createAction } from 'redux-actions';
import { API_URL } from '../../utilities/const';

export const actions = {
  SET_CONFIG: 'app/SET_CONFIG',
  UPSERT_PLAYERS: 'app/UPSERT_PLAYERS',
  CHANGE_PAGE: 'app/CHANGE_PAGE',
  LOADING: 'app/LOADING',
  LOADED: 'app/LOADED',
  ERROR: 'app/ERROR',
};

const setConfig = createAction(actions.SET_CONFIG, (payload) => payload);
const upsertPlayers = createAction(actions.UPSERT_PLAYERS, (payload) => payload);
const loading = createAction(actions.LOADING);
const loaded = createAction(actions.LOADED);
const error = createAction(actions.ERROR, (payload) => payload);

export const changePage = createAction(actions.CHANGE_PAGE, (payload) => payload);

export function loadConfig() {
  return function(dispatch) {
    dispatch(loading());
    axios.get(`${API_URL}/config/client`).then((res) => {
      dispatch(setConfig(res.data));
      dispatch(loaded());
    }).catch((err) => {
      console.warn('Config Error:', err);
      dispatch(error('configuration error'));
    });
  }
}

export function upsertOnlinePlayers(onlinePlayers) {
  return function(dispatch) {
    dispatch(loading());
    dispatch(upsertPlayers(onlinePlayers));
    dispatch(loaded());
  }
}