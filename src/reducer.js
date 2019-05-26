import { combineReducers } from 'redux-immutable';
import { reducer as authReducer } from './resources/auth';
import { reducer as categoryReducer } from './resources/category';

const appReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
});

export default (state, action) => appReducer(state, action);
