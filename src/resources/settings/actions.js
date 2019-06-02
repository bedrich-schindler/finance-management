import {
  convertStoreToFile,
  convertFileToStore,
} from '../../services/userStoreService';
import { updateLoggedUserData } from '../../services/storageService';
import * as types from './actionTypes';

export const editSettings = data => (dispatch) => {
  dispatch({
    payload: data,
    type: types.EDIT_SETTINGS,
  });
};

export const importUserData = storeBase64URIString => () => {
  try {
    const store = convertFileToStore(storeBase64URIString);

    // It is not possible to replace whole store, so first update data
    // in browser storage and then perform reload
    updateLoggedUserData(store);
    // eslint-disable-next-line  no-restricted-globals
    location.reload();
  } catch (e) {
    return false;
  }

  return true;
};

export const exportUserData = () => (dispatch, getState) => {
  const store = getState().toJS();
  const storeBase64URIString = convertStoreToFile(store);

  // It is not possible to perform file download directly from JS, so create
  // downloadable link element with data blob in href and perform click on it
  // to force file to be downloaded
  const element = document.createElement('a');
  element.setAttribute('href', `data:text/plain;charset=utf-8,${storeBase64URIString}`);
  element.setAttribute('download', `finance_management_user_data_${(new Date().toJSON())}`);
  element.click();

  return true;
};
