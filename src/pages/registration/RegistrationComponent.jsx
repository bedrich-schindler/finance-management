import PropTypes from 'prop-types';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconLockOutlined from '@material-ui/icons/LockOutlined';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import { withRouter } from 'react-router-dom';
import { validateUser } from '../../services/validatorService';
import routes from '../../routes';
import styles from './styles.scss';

class RegistrationComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        name: '',
        password: '',
        passwordRepeat: '',
        username: '',
      },
      formValidity: {
        elements: {
          name: null,
          password: null,
          passwordRepeat: null,
          username: null,
        },
        isValid: false,
      },
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.saveHandler = this.saveHandler.bind(this);
  }

  changeHandler(e) {
    const eventTarget = e.target;

    this.setState((prevState) => {
      const formData = Object.assign({}, prevState.formData);
      formData[eventTarget.id] = eventTarget.value;

      return { formData };
    });
  }

  saveHandler() {
    const { register } = this.props;
    const { formData } = this.state;

    const formValidity = validateUser(formData);

    this.setState({ formValidity });

    if (formValidity.isValid) {
      register(formData);
    }
  }

  render() {
    const { history } = this.props;
    const {
      formData,
      formValidity,
    } = this.state;

    return (
      <main className={styles.main}>
        <Paper className={styles.loginBox}>
          <Avatar className={styles.signInIcon}>
            <IconLockOutlined />
          </Avatar>
          <form>
            <FormControl
              className={styles.usernameField}
              error={!!formValidity.elements.name}
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
                onChange={this.changeHandler}
                value={formData.name}
              />
              {formValidity.elements.name && (
                <FormHelperText>
                  {formValidity.elements.name}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl
              className={styles.usernameField}
              error={!!formValidity.elements.username}
              required
            >
              <InputLabel htmlFor="username">
                Username
              </InputLabel>
              <Input
                autoComplete="username"
                id="username"
                name="username"
                onChange={this.changeHandler}
                value={formData.username}
              />
              {formValidity.elements.username && (
                <FormHelperText>
                  {formValidity.elements.username}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl
              className={styles.passwordField}
              error={!!formValidity.elements.password}
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
                onChange={this.changeHandler}
                value={formData.password}
              />
              {formValidity.elements.password && (
                <FormHelperText>
                  {formValidity.elements.password}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl
              className={styles.passwordField}
              error={!!formValidity.elements.passwordRepeat}
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
                onChange={this.changeHandler}
                value={formData.passwordRepeat}
              />
              {formValidity.elements.passwordRepeat && (
                <FormHelperText>
                  {formValidity.elements.passwordRepeat}
                </FormHelperText>
              )}
            </FormControl>
            <Button
              color="primary"
              fullWidth
              onClick={this.saveHandler}
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
  register: PropTypes.func.isRequired,
};

export default withRouter(RegistrationComponent);
