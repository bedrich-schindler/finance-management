import React from 'react';
import teal from '@material-ui/core/colors/teal';
import { Provider } from 'react-redux';
import {
  Route,
  Router,
  Switch,
} from 'react-router-dom';
import {
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core/styles';
import routes from './routes';

// Main styles
import './styles/main.scss';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: teal,
  },
  typography: {
    useNextVariants: true,
  },
});

export default (store, history) => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          {Object.values(routes).map(routeItem => (
            <Route
              component={routeItem.component()}
              exact
              key={routeItem.path}
              path={routeItem.path}
            />
          ))}
        </Switch>
      </Router>
    </Provider>
  </MuiThemeProvider>
);
