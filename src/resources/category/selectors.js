import { createSelector } from 'reselect';

const getCategoryList = state => state.getIn(['category', 'categoryList']);

export const selectCategoryList = createSelector(
  [getCategoryList],
  data => (data ? data.toJS() : []),
);
