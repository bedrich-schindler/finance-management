import { connect } from 'react-redux';
import {
  editSettings,
  exportUserData,
  selectSettings,
  importUserData,
} from '../../resources/settings';
import Component from './SettingsComponent';

const mapStateToProps = state => ({
  settings: selectSettings(state),
});

const mapDispatchToProps = dispatch => ({
  editSettings: data => dispatch(editSettings(data)),
  exportUserData: () => dispatch(exportUserData()),
  importUserData: data => dispatch(importUserData(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
