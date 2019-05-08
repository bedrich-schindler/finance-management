import { connect } from 'react-redux';
import { login } from '../../resources/auth';
import Component from './LoginComponent';

const mapDispatchToProps = dispatch => ({
  login: data => dispatch(login(data)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Component);
