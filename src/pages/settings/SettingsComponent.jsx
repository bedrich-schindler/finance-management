import PropTypes from 'prop-types';
import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/NativeSelect/NativeSelect';
import { codes } from 'currency-codes';
import { Layout } from '../../components/Layout';
import { ImportUserDataErrorModal } from './components/ImportUserDataErrorModal';
import styles from './styles.scss';

class SettingsComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isImportDataErrorModalOpened: false,
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.importUserDataHandler = this.importUserDataHandler.bind(this);
    this.handleCloseImportDataErrorModal = this.handleCloseImportDataErrorModal.bind(this);
  }

  changeHandler(e) {
    const {
      editSettings,
      settings,
    } = this.props;
    const eventTarget = e.target;

    editSettings({
      ...settings,
      [eventTarget.id]: eventTarget.value,
    });
  }

  importUserDataHandler(e) {
    const { importUserData } = this.props;
    const fileReader = new FileReader();
    const file = e.target.files[0];

    if (file === undefined) {
      return;
    }

    fileReader.onload = (oe) => {
      if (!importUserData(oe.target.result)) {
        this.handleOpenImportDataErrorModal();
      }
    };

    fileReader.readAsText(file);
  }

  handleOpenImportDataErrorModal() {
    return this.setState({ isImportDataErrorModalOpened: true });
  }

  handleCloseImportDataErrorModal() {
    return this.setState({ isImportDataErrorModalOpened: false });
  }

  render() {
    const {
      exportUserData,
      settings,
    } = this.props;
    const { isImportDataErrorModalOpened } = this.state;

    return (
      <Layout>
        <h1>Settings</h1>
        <div className={styles.paperWrapper}>
          <Paper className={styles.paper}>
            <h2>General</h2>
            <hr />
            <FormControl className={styles.field}>
              <InputLabel htmlFor="category">
                Currency
              </InputLabel>
              <Select
                value={settings.currency}
                onChange={this.changeHandler}
                inputProps={{
                  id: 'currency',
                  name: 'currency',
                }}
              >
                {codes().map(code => (
                  <option
                    key={code}
                    value={code}
                  >
                    {code}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Paper>
          <Paper className={styles.paper}>
            <h2>Data</h2>
            <hr />
            <FormControl className={styles.field}>
              <Button
                color="primary"
                variant="contained"
                onClick={exportUserData}
              >
                Export
              </Button>
              <FormHelperText>
                If you click on Export button, all your data will be exported to the file.
                This file is readable only by this application.
              </FormHelperText>
            </FormControl>
            <FormControl className={styles.field}>
              <Input
                style={{ display: 'none' }}
                id="upload"
                name="upload"
                type="file"
                onChange={this.importUserDataHandler}
              />
              {/* eslint-disable-next-line */}
              <label htmlFor="upload">
                <Button
                  fullWidth
                  component="span"
                  color="primary"
                  variant="contained"
                >
                  Import
                </Button>
              </label>
              <FormHelperText>
                If you click on Import button, data from this file will overwrite your
                current data and application will be reloaded.
              </FormHelperText>
            </FormControl>
          </Paper>
        </div>
        {isImportDataErrorModalOpened && (
          <ImportUserDataErrorModal onClose={this.handleCloseImportDataErrorModal} />
        )}
      </Layout>
    );
  }
}

SettingsComponent.propTypes = {
  editSettings: PropTypes.func.isRequired,
  exportUserData: PropTypes.func.isRequired,
  importUserData: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    currency: PropTypes.string.isRequired,
  }).isRequired,
};

export default SettingsComponent;
