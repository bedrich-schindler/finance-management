import { isUserSaved } from './storageService';

export const validateUser = (data) => {
  const errors = {
    elements: {
      name: null,
      password: null,
      passwordRepeat: null,
      username: null,
    },
    isValid: true,
  };

  const emptyCheck = [
    'name',
    'username',
    'password',
    'passwordRepeat',
  ];

  emptyCheck.forEach((element) => {
    if (data[element].trim() === '') {
      errors.elements[element] = 'Field is required.';
      errors.isValid = false;
    }
  });

  if (data.password !== data.passwordRepeat) {
    errors.elements.passwordRepeat = 'Entered passwords does not match.';
    errors.isValid = false;
  }

  if (errors.elements.username === null && isUserSaved(data.username)) {
    errors.elements.username = 'Entered username already exists.';
    errors.isValid = false;
  }

  return errors;
};
