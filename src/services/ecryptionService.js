import CryptoJS from 'crypto-js';

export const encryptObject = (object, secret) => {
  const stringObject = JSON.stringify(object);
  const bytes = CryptoJS.AES.encrypt(stringObject, secret);

  return bytes.toString();
};

export const decryptObject = (encryptedStringObject, secret) => {
  const bytes = CryptoJS.AES.decrypt(encryptedStringObject, secret);
  const stringObject = bytes.toString(CryptoJS.enc.Utf8);

  return JSON.parse(stringObject);
};

export const hash = text => CryptoJS.SHA3(text).toString(CryptoJS.enc.Hex);
