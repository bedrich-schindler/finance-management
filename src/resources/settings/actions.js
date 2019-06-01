import * as types from './actionTypes';

export const editSettings = data => (dispatch) => {
  dispatch({
    payload: data,
    type: types.EDIT_SETTINGS,
  });
};
