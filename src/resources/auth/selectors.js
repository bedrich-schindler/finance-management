import { createSelector } from 'reselect';

const getLoggedUser = state => state.getIn(['auth', 'loggedUser']);

export const selectLoggedUser = createSelector(
  [getLoggedUser],
  data => (data ? data.toJS() : null),
);
