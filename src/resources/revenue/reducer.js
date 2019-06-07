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
    return Immutable.fromJS(payload.store.revenue);
  }

  if (type === actionTypes.ADD_REVENUE) {
    const revenue = Immutable.fromJS(payload);
    const revenueList = state.get('revenueList');
    const revenueListUpdated = revenueList.insert(revenueList.size, revenue);

    return state.set('revenueList', revenueListUpdated);
  }

  if (type === actionTypes.EDIT_REVENUE) {
    const revenue = Immutable.fromJS(payload);
    const revenueList = state.get('revenueList');
    const revenueIndex = revenueList.findIndex(iRevenue => iRevenue.get('id') === payload.id);
    const revenueListUpdated = revenueList.set(revenueIndex, revenue);

    return state.set('revenueList', revenueListUpdated);
  }

  if (type === actionTypes.DELETE_REVENUE) {
    const revenueId = payload.id;
    const revenueList = state.get('revenueList');
    const revenueListUpdated = revenueList.filter(iRevenue => iRevenue.get('id') !== revenueId);

    return state.set('revenueList', revenueListUpdated);
  }

  return state;
};
