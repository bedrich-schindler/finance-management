import thunkMiddleware from 'redux-thunk';
import {
  applyMiddleware,
  createStore,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer';

const middlewareList = [
  thunkMiddleware,
];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middlewareList)),
);

export default store;
