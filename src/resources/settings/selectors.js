import { createSelector } from 'reselect';

const getSettings = state => state.getIn(['settings', 'settings']);

export const selectSettings = createSelector(
  [getSettings],
  data => (data ? data.toJS() : null),
);
