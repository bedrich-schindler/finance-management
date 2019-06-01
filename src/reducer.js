import { combineReducers } from 'redux-immutable';
import { reducer as authReducer } from './resources/auth';
import { reducer as categoryReducer } from './resources/category';
import { reducer as revenueReducer } from './resources/revenue';

const appReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  revenue: revenueReducer,
});

export default (state, action) => appReducer(state, action);
