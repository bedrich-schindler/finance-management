import { render } from 'react-dom';
import app from './app';
import appHistory from './appHistory';
import store from './store';

render(
  app(store, appHistory),
  document.getElementById('app'),
);
