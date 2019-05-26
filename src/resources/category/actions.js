import uuid from 'uuid/v1';
import * as types from './actionTypes';

export const addCategory = data => (dispatch) => {
  const payloadData = {
    ...data,
    id: uuid(),
  };

  dispatch({
    payload: payloadData,
    type: types.ADD_CATEGORY,
  });
};

export const deleteCategory = id => (dispatch) => {
  const payloadData = { id };

  dispatch({
    payload: payloadData,
    type: types.DELETE_CATEGORY,
  });

  // TODO: Unset category from expenses/revenues
};

export const editCategory = (id, data) => (dispatch) => {
  const payloadData = {
    ...data,
    id,
  };

  dispatch({
    payload: payloadData,
    type: types.EDIT_CATEGORY,
  });
};
