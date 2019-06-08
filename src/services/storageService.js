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

/**
 * Gets flag whether user with entered username is saved in application store (in local storage).
 *
 * @param userKey Username.
 * @returns {boolean} Flag whether is saved.
 */
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

/**
 * Gets user data object or null if credentials are not correct
 * or user is not saved in application store (in local storage).
 *
 * @param userKey Username.
 * @param userPasswordHashed Password hash to be used for encryption of user data.
 * @returns {object|null} User data object.
 */
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

/**
 * Gets logged user credentials object (from session storage) of null if nobody is logged in.
 *
 * @returns {object|null} User credentials object.
 */
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

/**
 * Gets logged user data object (from local storage) of null if nobody is logged in.
 *
 * @returns {object|null} Logged user data object.
 */
export const getLoggedUserData = () => {
  const loggedUserCredentials = getLoggedUserCredentials();

  if (loggedUserCredentials !== null) {
    return getUserData(loggedUserCredentials.username, loggedUserCredentials.password);
  }

  return null;
};

/**
 * Logs in user (and saves credentials to session storage).
 *
 * @param userKey Username
 * @param userPassword Hashed password.
 * @returns {boolean} Flag whether logged in successfully.
 */
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

/**
 * Logs in user (and removes credentials to session storage).
 */
export const logoutUser = () => {
  sessionStorage.removeItem(LOGGED_USER_STORE_KEY);
};

/**
 * Saves user data (to local storage) and logs in user (and saves credentials to session storage).
 *
 * @param userKey Username.
 * @param userPassword Hashed password.
 * @param userInfo User info object.
 * @param userStore User store object.
 * @returns {object} User data object.
 */
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

/**
 * Updates logged user store.
 *
 * @param userStore Logged user store.
 * @returns {boolean}  Flag if updated successfully.
 */
export const updateLoggedUserData = (userStore) => {
  const loggedUserCredentials = getLoggedUserCredentials();

  if (loggedUserCredentials === null) {
    return false;
  }

  const loggedUserData = getLoggedUserData();

  if (loggedUserData === null) {
    return false;
  }

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
    info: loggedUserData.info,
    store: userStore,
  };

  applicationStore[loggedUserCredentials.username] = encryptObject(
    userObject,
    loggedUserCredentials.password,
  );
  applicationStoreEncrypted = encryptObject(applicationStore, STORE_SECRET);

  localStorage.setItem(APP_STORE_KEY, applicationStoreEncrypted);

  return true;
};
