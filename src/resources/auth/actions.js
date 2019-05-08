import {
  getUserData,
  saveUserData,
} from '../../services/storageService';
import * as types from './actionTypes';

export const login = data => (dispatch) => {
  const {
    username,
    password,
  } = data;
  const user = getUserData(username, password);

  if (user === null) {
    return false;
  }

  return dispatch({
    payload: user.info,
    type: types.LOGIN,
  });
};

export const logout = () => dispatch => dispatch({
  type: types.LOGOUT,
});

export const register = data => (dispatch) => {
  const {
    name,
    username,
    password,
  } = data;
  const user = saveUserData(username, password, { name }, {});

  return dispatch({
    payload: user.info,
    type: types.REGISTER,
  });
};
