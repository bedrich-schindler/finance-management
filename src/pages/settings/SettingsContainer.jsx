import { connect } from 'react-redux';
import {
  editSettings,
  selectSettings,
} from '../../resources/settings';
import Component from './SettingsComponent';

const mapStateToProps = state => ({
  settings: selectSettings(state),
});

const mapDispatchToProps = dispatch => ({
  editSettings: data => dispatch(editSettings(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
