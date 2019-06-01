import { createSelector } from 'reselect';

const getRevenueList = state => state.getIn(['revenue', 'revenueList']);

export const selectRevenueList = createSelector(
  [getRevenueList],
  data => (data ? data.toJS() : []),
);
