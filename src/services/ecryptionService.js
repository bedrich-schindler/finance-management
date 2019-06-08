import CryptoJS from 'crypto-js';

/**
 * Transforms object to encrypted JSON.
 *
 * @param object Object to be transformed to encrypted JSON.
 * @param secret Secret string to be used for encryption of object.
 * @returns {string} Encrypted JSON.
 */
export const encryptObject = (object, secret) => {
  const stringObject = JSON.stringify(object);
  const bytes = CryptoJS.AES.encrypt(stringObject, secret);

  return bytes.toString();
};

/**
 * Transforms encrypted JSON to object.
 *
 * @param encryptedStringObject Encrypted JSON.
 * @param secret Secret string to be used for description of object.
 * @returns {object} Decrypted object.
 */
export const decryptObject = (encryptedStringObject, secret) => {
  const bytes = CryptoJS.AES.decrypt(encryptedStringObject, secret);
  const stringObject = bytes.toString(CryptoJS.enc.Utf8);

  return JSON.parse(stringObject);
};

/**
 * Creates SHA3 hash from text.
 *
 * @param text Text to be hashed.
 * @returns {string} Hashed text.
 */
export const hash = text => CryptoJS.SHA3(text).toString(CryptoJS.enc.Hex);
