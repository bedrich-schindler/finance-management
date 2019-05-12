import { hash } from '../../services/ecryptionService';
import {
  getUserData,
  loginUser,
  logoutUser,
  saveUserData,
} from '../../services/storageService';
import * as types from './actionTypes';

export const login = data => (dispatch) => {
  const {
    username,
    password,
  } = data;
  const user = getUserData(username, hash(password));

  if (user === null) {
    return false;
  }

  if (!loginUser(username, hash(password))) {
    return false;
  }

  dispatch({
    payload: user.info,
    type: types.LOGIN,
  });

  return true;
};

export const logout = () => (dispatch) => {
  logoutUser();

  dispatch({
    type: types.LOGOUT,
  });
};

export const register = data => (dispatch, getState) => {
  const {
    name,
    username,
    password,
  } = data;

  const userInfo = { name };

  dispatch({
    payload: userInfo,
    type: types.REGISTER,
  });

  saveUserData(username, hash(password), userInfo, getState().toJS());
};
