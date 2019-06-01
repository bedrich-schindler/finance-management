import { combineReducers } from 'redux-immutable';
import { reducer as authReducer } from './resources/auth';
import { reducer as categoryReducer } from './resources/category';
import { reducer as expenseReducer } from './resources/expense';
import { reducer as revenueReducer } from './resources/revenue';
import { reducer as settingsReducer } from './resources/settings';

const appReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  expense: expenseReducer,
  revenue: revenueReducer,
  settings: settingsReducer,
});

export default (state, action) => appReducer(state, action);
