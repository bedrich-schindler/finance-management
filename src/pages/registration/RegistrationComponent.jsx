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
class RegistrationComponent extends React.Component {
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
              <InputLabel htmlFor="name">
                Name
              </InputLabel>
              <Input
                autoComplete="name"
                autoFocus
                id="name"
                name="name"
              />
            </FormControl>
            <FormControl
              className={styles.usernameField}
              required
            >
              <InputLabel htmlFor="username">
                Username
              </InputLabel>
              <Input
                autoComplete="username"
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
                autoComplete="new-password"
                id="password"
                name="password"
                type="password"
              />
            </FormControl>
            <FormControl
              className={styles.passwordField}
              required
            >
              <InputLabel htmlFor="passwordRepeat">
                Repeat password
              </InputLabel>
              <Input
                autoComplete="new-password"
                id="passwordRepeat"
                name="passwordRepeat"
                type="password"
              />
            </FormControl>
            <Button
              color="primary"
              fullWidth
              variant="contained"
            >
              Register
            </Button>
            <Button
              className={styles.signInButton}
              color="default"
              fullWidth
              onClick={() => history.push(routes.login.path)}
              variant="contained"
            >
              Back to login
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

RegistrationComponent.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(RegistrationComponent);
