import React from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import routes from '../../../../routes';

class AuthorizedRouteComponent extends Route {
  render() {
    const {
      component,
      exact,
      loggedUser,
      path,
    } = this.props;

    if (loggedUser) {
      return (
        <Route
          exact={exact}
          path={path}
          component={component}
        />
      );
    }

    return <Redirect to={routes.login.path} />;
  }
}

AuthorizedRouteComponent.defaultProps = {
  exact: false,
  loggedUser: null,
};

AuthorizedRouteComponent.propTypes = {
  component: PropTypes.func.isRequired,
  exact: PropTypes.bool,
  loggedUser: PropTypes.shape(),
  path: PropTypes.string.isRequired,
};

export default AuthorizedRouteComponent;
