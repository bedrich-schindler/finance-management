import { connect } from 'react-redux';
import {
  logout,
  selectLoggedUser,
} from '../../resources/auth';
import Component from './LayoutComponent';

const mapStateToProps = state => ({
  loggedUser: selectLoggedUser(state),
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
