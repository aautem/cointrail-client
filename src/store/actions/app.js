import { createAction } from 'redux-actions';

export const actions = {
  CHANGE_PAGE: 'app/CHANGE_PAGE',
  LOADING: 'app/LOADING',
  LOADED: 'app/LOADED',
  ERROR: 'app/ERROR',
};

export const changePage = createAction(actions.CHANGE_PAGE, (payload) => payload);