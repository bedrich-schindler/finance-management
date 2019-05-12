import {
  STORE_KEY,
  STORE_SECRET,
} from '../../config/config';
import {
  decryptObject,
  encryptObject,
} from './ecryptionService';

const APP_STORE_KEY = `${STORE_KEY}_app`;
const LOGGED_USER_STORE_KEY = `${STORE_KEY}_logged_user`;

export const isUserSaved = (userKey) => {
  const applicationStoreEncrypted = localStorage.getItem(APP_STORE_KEY);

  if (applicationStoreEncrypted !== null) {
    try {
      const applicationStore = decryptObject(applicationStoreEncrypted, STORE_SECRET);

      return applicationStore[userKey] !== undefined;
    } catch (e) {
      return false;
    }
  }

  return false;
};

export const getUserData = (userKey, userPasswordHashed) => {
  const applicationStoreEncrypted = localStorage.getItem(APP_STORE_KEY);

  if (applicationStoreEncrypted !== null) {
    try {
      const applicationStore = decryptObject(applicationStoreEncrypted, STORE_SECRET);

      return decryptObject(applicationStore[userKey], userPasswordHashed);
    } catch (e) {
      return null;
    }
  }

  return null;
};

export const getLoggedUserCredentials = () => {
  const loggedUserCredentialsEncrypted = sessionStorage.getItem(LOGGED_USER_STORE_KEY);

  if (loggedUserCredentialsEncrypted !== null) {
    try {
      return decryptObject(loggedUserCredentialsEncrypted, STORE_SECRET);
    } catch (e) {
      return null;
    }
  }

  return null;
};

export const getLoggedUserData = () => {
  const loggedUserCredentials = getLoggedUserCredentials();

  if (loggedUserCredentials !== null) {
    return getUserData(loggedUserCredentials.username, loggedUserCredentials.password);
  }

  return null;
};

export const loginUser = (userKey, userPassword) => {
  const loggedUserData = getUserData(userKey, userPassword);

  if (loggedUserData !== null) {
    const loggedUserCredentials = {
      password: userPassword,
      username: userKey,
    };
    const loggedUserCredentialsEncrypted = encryptObject(loggedUserCredentials, STORE_SECRET);

    sessionStorage.setItem(LOGGED_USER_STORE_KEY, loggedUserCredentialsEncrypted);

    return true;
  }

  return false;
};

export const logoutUser = () => {
  sessionStorage.removeItem(LOGGED_USER_STORE_KEY);
};

export const saveUserData = (userKey, userPassword, userInfo, userStore) => {
  let applicationStoreEncrypted = localStorage.getItem(APP_STORE_KEY);
  let applicationStore = {};

  if (applicationStoreEncrypted !== null) {
    try {
      applicationStore = decryptObject(applicationStoreEncrypted, STORE_SECRET);
    } catch (e) {
      applicationStore = {};
    }
  }

  const userObject = {
    info: {
      ...userInfo,
      username: userKey,
    },
    store: userStore,
  };

  applicationStore[userKey] = encryptObject(userObject, userPassword);
  applicationStoreEncrypted = encryptObject(applicationStore, STORE_SECRET);

  localStorage.setItem(APP_STORE_KEY, applicationStoreEncrypted);

  const loggedUserCredentials = {
    password: userPassword,
    username: userKey,
  };
  const loggedUserCredentialsEncrypted = encryptObject(loggedUserCredentials, STORE_SECRET);

  sessionStorage.setItem(LOGGED_USER_STORE_KEY, loggedUserCredentialsEncrypted);

  return userObject;
};
