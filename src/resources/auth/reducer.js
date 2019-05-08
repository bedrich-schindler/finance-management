import Immutable from 'immutable';
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

  if (type === actionTypes.LOGIN) {
    return state.set('loggedUser', Immutable.fromJS(payload));
  }

  if (type === actionTypes.LOGOUT) {
    return state.set('loggedUser', null);
  }

  if (type === actionTypes.REGISTER) {
    return state.set('loggedUser', Immutable.fromJS(payload));
  }

  return state;
};
