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
import { validateExpense } from '../../../../services/validatorService';
import {
  CATEGORY_TYPE_ALL,
  CATEGORY_TYPE_EXPENSE,
  CATEGORY_TYPES,
} from '../../../../resources/category';
import styles from '../../styles.scss';

class EditExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        amount: '',
        category: '',
        name: '',
      },
      formValidity: {
        elements: {
          amount: null,
          category: null,
          name: null,
        },
        isValid: false,
      },
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.saveHandler = this.saveHandler.bind(this);
  }

  componentDidMount() {
    const {
      expenseList,
      id,
    } = this.props;

    const expense = expenseList.find(iExpense => iExpense.id === id);

    this.setState({ formData: { ...expense } });
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
      categoryList,
      id,
      onClose,
      onSave,
    } = this.props;
    const { formData } = this.state;

    const formValidity = validateExpense(formData, { categoryList });

    this.setState({ formValidity });

    if (formValidity.isValid) {
      onSave(
        id,
        {
          ...formData,
          amount: parseFloat(formData.amount),
        },
      );
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
          Edit expense
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
            error={!!formValidity.elements.expense}
            required
          >
            <InputLabel htmlFor="expense">
              Expense
            </InputLabel>
            <Input
              autoFocus
              id="expense"
              name="expense"
              onChange={this.changeHandler}
              value={formData.expense}
            />
            {formValidity.elements.expense && (
              <FormHelperText>
                {formValidity.elements.expense}
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
                      || iCategory.type === CATEGORY_TYPE_EXPENSE,
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
            Edit
          </Button>
          <Button onClick={onClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

EditExpenseForm.propTypes = {
  categoryList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(CATEGORY_TYPES).isRequired,
  })).isRequired,
  expenseList: PropTypes.arrayOf(PropTypes.shape({
    amount: PropTypes.number.isRequired,
    category: PropTypes.string,
    date: PropTypes.string.isRequired,
    expense: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    currency: PropTypes.string.isRequired,
  }).isRequired,
};

export default EditExpenseForm;
