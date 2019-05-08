import React from 'react';
import teal from '@material-ui/core/colors/teal';
import { Provider } from 'react-redux';
import {
  Router,
  Switch,
} from 'react-router-dom';
import {
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core/styles';
import { AuthorizedRoute } from './resources/auth/components/AuthorizedRoute';
import { UnauthorizedRoute } from './resources/auth/components/UnauthorizedRoute';
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
          {Object.values(routes).map((routeItem) => {
            if (routeItem.isAnonymous) {
              return (
                <UnauthorizedRoute
                  component={routeItem.component()}
                  exact
                  key={routeItem.path}
                  path={routeItem.path}
                />
              );
            }

            return (
              <AuthorizedRoute
                component={routeItem.component()}
                exact
                key={routeItem.path}
                path={routeItem.path}
              />
            );
          })}
        </Switch>
      </Router>
    </Provider>
  </MuiThemeProvider>
);
