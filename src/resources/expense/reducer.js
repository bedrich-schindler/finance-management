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
    return Immutable.fromJS(payload.store.expense);
  }

  if (type === actionTypes.ADD_EXPENSE) {
    const expense = Immutable.fromJS(payload);
    const expenseList = state.get('expenseList');
    const expenseListUpdated = expenseList.insert(expenseList.size, expense);

    return state.set('expenseList', expenseListUpdated);
  }

  if (type === actionTypes.EDIT_EXPENSE) {
    const expense = Immutable.fromJS(payload);
    const expenseList = state.get('expenseList');
    const expenseIndex = expenseList.findIndex(iExpense => iExpense.get('id') === payload.id);
    const expenseListUpdated = expenseList.set(expenseIndex, expense);

    return state.set('expenseList', expenseListUpdated);
  }

  if (type === actionTypes.DELETE_EXPENSE) {
    const expenseId = payload.id;
    const expenseList = state.get('expenseList');
    const expenseListUpdated = expenseList.filter(iExpense => iExpense.get('id') !== expenseId);

    return state.set('expenseList', expenseListUpdated);
  }

  return state;
};
