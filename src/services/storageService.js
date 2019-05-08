import {
  STORE_KEY,
  STORE_SECRET,
} from '../../config/config';
import {
  decryptObject,
  encryptObject,
} from './ecryptionService';

export const isUserSaved = (userKey) => {
  const applicationStoreEncrypted = localStorage.getItem(STORE_KEY);

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

export const getUserData = (userKey, userPassword) => {
  const applicationStoreEncrypted = localStorage.getItem(STORE_KEY);

  if (applicationStoreEncrypted !== null) {
    try {
      const applicationStore = decryptObject(applicationStoreEncrypted, STORE_SECRET);

      return decryptObject(applicationStore[userKey], userPassword);
    } catch (e) {
      return null;
    }
  }

  return null;
};

export const saveUserData = (userKey, userPassword, userInfo, userStore) => {
  let applicationStoreEncrypted = localStorage.getItem(STORE_KEY);
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

  localStorage.setItem(STORE_KEY, applicationStoreEncrypted);

  return userObject;
};
