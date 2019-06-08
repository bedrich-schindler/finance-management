import { STORE_SECRET } from '../../config/config';
import {
  decryptObject,
  encryptObject,
} from './ecryptionService';

/**
 * Converts encrypted JSON in base64 to application store.
 *
 * @param storeBase64URIString Encrypted JSON in base64
 * @returns {object} Application store.
 */
export const convertFileToStore = (storeBase64URIString) => {
  const storeBase64String = decodeURIComponent(storeBase64URIString);
  const storeURIString = atob(storeBase64String);
  const storeStringEncrypted = decodeURIComponent(
    storeURIString
      .split('')
      .map(c => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
      .join(''),
  );
  const storeString = decryptObject(storeStringEncrypted, STORE_SECRET);

  return JSON.parse(storeString);
};

/**
 * Converts application store to encrypted JSON in base64.
 *
 * @param store Application store.
 * @returns {string} Encrypted JSON in base64
 */
export const convertStoreToFile = (store) => {
  const storeString = JSON.stringify(store);
  const storeStringEncrypted = encryptObject(storeString, STORE_SECRET);
  const storeURIString = encodeURIComponent(storeStringEncrypted)
    .replace(
      /%([0-9A-F]{2})/g,
      (match, p1) => String.fromCharCode(`0x${p1}`),
    );
  const storeBase64String = btoa(storeURIString);

  return encodeURIComponent(storeBase64String);
};
