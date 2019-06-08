import {
  applyUpdate,
  install,
} from 'offline-plugin/runtime';
import { render } from 'react-dom';
import app from './app';
import appHistory from './appHistory';
import store from './store';

install({
  onUpdateReady: () => {
    applyUpdate();
  },
  onUpdated: () => {
    window.location.reload();
  },
});

render(
  app(store, appHistory),
  document.getElementById('app'),
);
