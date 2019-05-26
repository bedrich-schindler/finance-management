import Immutable from 'immutable';
import thunkMiddleware from 'redux-thunk';
import {
  applyMiddleware,
  createStore,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  getLoggedUserData,
  updateLoggedUserData,
} from './services/storageService';
import reducer from './reducer';

const middlewareList = [
  thunkMiddleware,
];

// eslint-disable-next-line import/no-mutable-exports
let store;

const loggedUserData = getLoggedUserData();

if (loggedUserData === null) {
  store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middlewareList)),
  );
} else {
  store = createStore(
    reducer,
    Immutable.fromJS(loggedUserData.store),
    composeWithDevTools(applyMiddleware(...middlewareList)),
  );
}

store.subscribe(() => {
  updateLoggedUserData(store.getState().toJS());
});

export default store;
