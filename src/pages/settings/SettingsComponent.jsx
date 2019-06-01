import PropTypes from 'prop-types';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import { codes } from 'currency-codes';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/NativeSelect/NativeSelect';
import { Layout } from '../../components/Layout';
import styles from './styles.scss';

class SettingsComponent extends React.Component {
  constructor(props) {
    super(props);

    this.changeHandler = this.changeHandler.bind(this);
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

  render() {
    const {
      settings,
    } = this.props;

    return (
      <Layout>
        <h1>Settings</h1>
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
      </Layout>
    );
  }
}

SettingsComponent.propTypes = {
  editSettings: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    currency: PropTypes.string.isRequired,
  }).isRequired,
};

export default SettingsComponent;
