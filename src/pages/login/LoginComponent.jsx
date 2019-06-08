import PropTypes from 'prop-types';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import IconError from '@material-ui/icons/Error';
import IconLockOutlined from '@material-ui/icons/LockOutlined';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withRouter } from 'react-router-dom';
import Logo from '../../images/logo.svg';
import routes from '../../routes';
import styles from './styles.scss';

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        password: '',
        username: '',
      },
      isLoginFailed: false,
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
  }

  changeHandler(e) {
    const eventTarget = e.target;

    this.setState((prevState) => {
      const formData = { ...prevState.formData };
      formData[eventTarget.id] = eventTarget.value;

      return { formData };
    });
  }

  loginHandler() {
    const { login } = this.props;
    const { formData } = this.state;

    if (!login(formData)) {
      this.setState({ isLoginFailed: true });
    }
  }

  render() {
    const { history } = this.props;
    const {
      formData,
      isLoginFailed,
    } = this.state;

    return (
      <main className={styles.main}>
        <div className={styles.loadBoxWrapper}>
          <div className={styles.beforeLoadBox}>
            <Logo className={styles.logo} />
            <h1 className={styles.logoTitle}>
              Finance management
            </h1>
          </div>
          <div className={styles.afterLoadBox}>
            <Paper className={styles.loginBox}>
              {isLoginFailed && (
                <SnackbarContent
                  className={styles.formErrorMessageBox}
                  message={(
                    <span className={styles.formErrorMessage}>
                      <IconError className={styles.formErrorMessageIcon} />
                      Username or password is not correct.
                    </span>
                  )}
                />
              )}
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
                    onChange={this.changeHandler}
                    value={formData.username}
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
                    onChange={this.changeHandler}
                    value={formData.password}
                  />
                </FormControl>
                <Button
                  color="primary"
                  fullWidth
                  onClick={this.loginHandler}
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
          </div>
        </div>
      </main>
    );
  }
}

LoginComponent.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  login: PropTypes.func.isRequired,
};

export default withRouter(LoginComponent);
