import PropTypes from 'prop-types';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import IconLockOutlined from '@material-ui/icons/LockOutlined';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import { withRouter } from 'react-router-dom';
import routes from '../../routes';
import styles from './styles.scss';

// eslint-disable-next-line react/prefer-stateless-function
class LoginComponent extends React.Component {
  render() {
    const { history } = this.props;

    return (
      <main className={styles.main}>
        <Paper className={styles.loginBox}>
          <Avatar className={styles.signInIcon}>
            <IconLockOutlined />
          </Avatar>
          <form>
            <FormControl
              className={styles.usernameField}
              required
            >
              <InputLabel htmlFor="username">
                Username
              </InputLabel>
              <Input
                autoComplete="username"
                autoFocus
                id="username"
                name="username"
              />
            </FormControl>
            <FormControl
              className={styles.passwordField}
              required
            >
              <InputLabel htmlFor="password">
                Password
              </InputLabel>
              <Input
                autoComplete="current-password"
                id="password"
                name="password"
                type="password"
              />
            </FormControl>
            <Button
              color="primary"
              fullWidth
              variant="contained"
            >
              Log in
            </Button>
            <Button
              className={styles.signInButton}
              color="default"
              fullWidth
              onClick={() => history.push(routes.registration.path)}
              variant="contained"
            >
              Go to registration
            </Button>
          </form>
        </Paper>
        <p className={styles.applicationInfo}>
          © Finance management, 2019
        </p>
      </main>
    );
  }
}

LoginComponent.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(LoginComponent);
