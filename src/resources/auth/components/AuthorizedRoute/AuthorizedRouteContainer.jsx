import { connect } from 'react-redux';
import { selectLoggedUser } from '../..';
import Component from './AuthorizedRouteComponent';

const mapStateToProps = state => ({
  loggedUser: selectLoggedUser(state),
});

export default connect(mapStateToProps)(Component);
