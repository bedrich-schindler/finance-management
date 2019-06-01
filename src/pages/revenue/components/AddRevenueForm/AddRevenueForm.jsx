import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/NativeSelect';
import { validateRevenue } from '../../../../services/validatorService';
import {
  CATEGORY_TYPE_ALL,
  CATEGORY_TYPE_REVENUE,
  CATEGORY_TYPES,
} from '../../../../resources/category';
import styles from '../../styles.scss';

class AddRevenueForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        amount: '',
        category: '',
        date: moment().format('YYYY-MM-DDTHH:mm'),
        revenue: '',
      },
      formValidity: {
        elements: {
          amount: null,
          category: null,
          date: null,
          revenue: null,
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
      const formData = { ...prevState.formData };
      formData[eventTarget.id] = eventTarget.value;

      return { formData };
    });
  }

  saveHandler() {
    const {
      onClose,
      onSave,
    } = this.props;
    const { formData } = this.state;

    const formValidity = validateRevenue(formData);

    this.setState({ formValidity });

    if (formValidity.isValid) {
      onSave({
        ...formData,
        amount: parseFloat(formData.amount),
      });
      onClose();
    }
  }

  render() {
    const {
      categoryList,
      onClose,
      settings,
    } = this.props;
    const {
      formData,
      formValidity,
    } = this.state;

    return (
      <Dialog
        fullWidth
        maxWidth="xs"
        onClose={onClose}
        open
      >
        <DialogTitle>
          Add revenue
        </DialogTitle>
        <DialogContent>
          <FormControl
            className={styles.field}
            error={!!formValidity.elements.date}
            required
          >
            <InputLabel htmlFor="date">
              Date
            </InputLabel>
            <Input
              autoFocus
              id="date"
              name="date"
              onChange={this.changeHandler}
              type="datetime-local"
              value={formData.date}
            />
            {formValidity.elements.date && (
              <FormHelperText>
                {formValidity.elements.date}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl
            className={styles.field}
            error={!!formValidity.elements.revenue}
            required
          >
            <InputLabel htmlFor="revenue">
              Revenue
            </InputLabel>
            <Input
              autoFocus
              id="revenue"
              name="revenue"
              onChange={this.changeHandler}
              value={formData.revenue}
            />
            {formValidity.elements.revenue && (
              <FormHelperText>
                {formValidity.elements.revenue}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl
            className={styles.field}
            error={!!formValidity.elements.amount}
            required
          >
            <InputLabel htmlFor="amount">
              Amount
            </InputLabel>
            <Input
              endAdornment={
                <InputAdornment position="end">{settings.currency}</InputAdornment>
              }
              id="amount"
              name="amount"
              onChange={this.changeHandler}
              type="number"
              value={formData.amount}
            />
            {formValidity.elements.amount && (
              <FormHelperText>
                {formValidity.elements.amount}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl
            className={styles.field}
            error={!!formValidity.elements.category}
          >
            <InputLabel htmlFor="category">
              Category
            </InputLabel>
            <Select
              value={formData.category}
              onChange={this.changeHandler}
              inputProps={{
                id: 'category',
                name: 'category',
              }}
            >
              <option value="" />
              {
                categoryList
                  .filter(
                    iCategory => iCategory.type === CATEGORY_TYPE_ALL
                      || iCategory.type === CATEGORY_TYPE_REVENUE,
                  )
                  .map(iCategory => (
                    <option
                      key={iCategory.id}
                      value={iCategory.id}
                    >
                      {iCategory.name}
                    </option>
                  ))
              }
            </Select>
            {formValidity.elements.category && (
              <FormHelperText>
                {formValidity.elements.category}
              </FormHelperText>
            )}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.saveHandler} color="primary">
            Add
          </Button>
          <Button onClick={onClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

AddRevenueForm.propTypes = {
  categoryList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(CATEGORY_TYPES).isRequired,
  })).isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    currency: PropTypes.string.isRequired,
  }).isRequired,
};

export default AddRevenueForm;
