import { combineReducers } from 'redux-immutable';
import { reducer as authReducer } from './resources/auth';

const appReducer = combineReducers({
  auth: authReducer,
});

export default (state, action) => appReducer(state, action);
