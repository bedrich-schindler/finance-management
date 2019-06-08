import {
  applyUpdate,
  install,
} from 'offline-plugin/runtime';
import { render } from 'react-dom';
import app from './app';
import appHistory from './appHistory';
import store from './store';

// Install offline-plugin service worker
install({
  onUpdateReady: () => {
    applyUpdate();
  },
  onUpdated: () => {
    window.location.reload();
  },
});

// Render application
render(
  app(store, appHistory),
  document.getElementById('app'),
);
