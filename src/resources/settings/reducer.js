import Immutable from 'immutable';
import { LOGIN } from '../auth/index';
import initialState from './initialState';
import * as actionTypes from './actionTypes';

export default (state, action) => {
  if (typeof state === 'undefined') {
    return initialState;
  }

  const {
    payload,
    type,
  } = action;

  if (type === LOGIN) {
    return Immutable.fromJS(payload.store.settings);
  }

  if (type === actionTypes.EDIT_SETTINGS) {
    const settings = Immutable.fromJS(payload);

    return state.set('settings', settings);
  }

  return state;
};
