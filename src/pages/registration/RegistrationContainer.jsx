import { connect } from 'react-redux';
import { register } from '../../resources/auth';
import Component from './RegistrationComponent';

const mapDispatchToProps = dispatch => ({
  register: data => dispatch(register(data)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Component);
