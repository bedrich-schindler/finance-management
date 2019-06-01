import uuid from 'uuid/v1';
import * as types from './actionTypes';

export const addExpense = data => (dispatch) => {
  const payloadData = {
    ...data,
    id: uuid(),
  };

  dispatch({
    payload: payloadData,
    type: types.ADD_EXPENSE,
  });
};

export const deleteExpense = id => (dispatch) => {
  const payloadData = { id };

  dispatch({
    payload: payloadData,
    type: types.DELETE_EXPENSE,
  });
};

export const editExpense = (id, data) => (dispatch) => {
  const payloadData = {
    ...data,
    id,
  };

  dispatch({
    payload: payloadData,
    type: types.EDIT_EXPENSE,
  });
};
