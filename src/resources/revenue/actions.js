import uuid from 'uuid/v1';
import * as types from './actionTypes';

export const addRevenue = data => (dispatch) => {
  const payloadData = {
    ...data,
    id: uuid(),
  };

  dispatch({
    payload: payloadData,
    type: types.ADD_REVENUE,
  });
};

export const deleteRevenue = id => (dispatch) => {
  const payloadData = { id };

  dispatch({
    payload: payloadData,
    type: types.DELETE_REVENUE,
  });
};

export const editRevenue = (id, data) => (dispatch) => {
  const payloadData = {
    ...data,
    id,
  };

  dispatch({
    payload: payloadData,
    type: types.EDIT_REVENUE,
  });
};
