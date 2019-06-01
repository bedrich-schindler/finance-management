import { createSelector } from 'reselect';

const getExpenseList = state => state.getIn(['expense', 'expenseList']);

export const selectExpenseList = createSelector(
  [getExpenseList],
  data => (data ? data.toJS() : []),
);
