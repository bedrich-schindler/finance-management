export const CATEGORY_TYPE_ALL = 'ALL';
export const CATEGORY_TYPE_EXPENSE = 'EXPENSE';
export const CATEGORY_TYPE_REVENUE = 'REVENUE';

export const CATEGORY_TYPES = [
  CATEGORY_TYPE_ALL,
  CATEGORY_TYPE_EXPENSE,
  CATEGORY_TYPE_REVENUE,
];

export const getCategoryTypeLabel = (type) => {
  switch (type) {
    case CATEGORY_TYPE_ALL:
      return 'All';
    case CATEGORY_TYPE_EXPENSE:
      return 'Expense';
    case CATEGORY_TYPE_REVENUE:
      return 'Revenue';
    default:
      return '-';
  }
};
