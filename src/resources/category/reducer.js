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

  if (type === actionTypes.ADD_CATEGORY) {
    const category = Immutable.fromJS(payload);
    const categoryList = state.get('categoryList');
    const categoryListUpdated = categoryList.insert(categoryList.size, category);

    return state.set('categoryList', categoryListUpdated);
  }

  if (type === actionTypes.EDIT_CATEGORY) {
    const category = Immutable.fromJS(payload);
    const categoryList = state.get('categoryList');
    const categoryIndex = categoryList.findIndex(iCategory => iCategory.get('id') === payload.id);
    const categoryListUpdated = categoryList.set(categoryIndex, category);

    return state.set('categoryList', categoryListUpdated);
  }

  if (type === actionTypes.DELETE_CATEGORY) {
    const categoryId = payload.id;
    const categoryList = state.get('categoryList');
    const categoryListUpdated = categoryList.filter(iCategory => iCategory.get('id') !== categoryId);

    return state.set('categoryList', categoryListUpdated);
  }

  return state;
};
