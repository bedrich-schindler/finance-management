import { CATEGORY_TYPES } from '../resources/category';
import { isUserSaved } from './storageService';

/**
 * Validates category.
 *
 * @param data Category to be validated.
 * @param storedDataObj Additional data used for validation.
 * @returns {object} Validation result object.
 */
export const validateCategory = (data, storedDataObj) => {
  const errors = {
    elements: {
      name: null,
      type: null,
    },
    isValid: true,
  };

  const emptyCheck = [
    'name',
    'type',
  ];

  emptyCheck.forEach((element) => {
    if (data[element].toString().trim() === '') {
      errors.elements[element] = 'Field is required.';
      errors.isValid = false;
    }
  });

  if (!errors.isValid) {
    return errors;
  }

  if (
    storedDataObj.categoryList.find(
      iCategory => (
        iCategory.name.toLowerCase() === data.name.toLowerCase()
        && iCategory.id !== data.id
      ),
    ) !== undefined
  ) {
    errors.elements.name = 'This value is not unique.';
    errors.isValid = false;
  }

  if (!CATEGORY_TYPES.includes(data.type)) {
    errors.elements.type = 'This value is not supported.';
    errors.isValid = false;
  }

  return errors;
};

/**
 * Validates expense.
 *
 * @param data Expense to be validated.
 * @returns {object} Validation result object.
 */
export const validateExpense = (data) => {
  const errors = {
    elements: {
      amount: null,
      date: null,
      expense: null,
    },
    isValid: true,
  };

  const emptyCheck = [
    'amount',
    'date',
    'expense',
  ];

  emptyCheck.forEach((element) => {
    if (data[element].toString().trim() === '') {
      errors.elements[element] = 'Field is required.';
      errors.isValid = false;
    }
  });

  if (errors.elements.amount !== null && data.amount <= 0) {
    errors.elements.amount = 'Field must be greater than 0.';
    errors.isValid = false;
  }

  return errors;
};

/**
 * Validates revenue.
 *
 * @param data Revenue to be validated.
 * @returns {object} Validation result object.
 */
export const validateRevenue = (data) => {
  const errors = {
    elements: {
      amount: null,
      date: null,
      revenue: null,
    },
    isValid: true,
  };

  const emptyCheck = [
    'amount',
    'date',
    'revenue',
  ];

  emptyCheck.forEach((element) => {
    if (data[element].toString().trim() === '') {
      errors.elements[element] = 'Field is required.';
      errors.isValid = false;
    }
  });

  if (errors.elements.amount !== null && data.amount <= 0) {
    errors.elements.amount = 'Field must be greater than 0.';
    errors.isValid = false;
  }

  return errors;
};

/**
 * Validates user.
 *
 * @param data User to be validated.
 * @returns {object} Validation result object.
 */
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
    if (data[element].toString().trim() === '') {
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
