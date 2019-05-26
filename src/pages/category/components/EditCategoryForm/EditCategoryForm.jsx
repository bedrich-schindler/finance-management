import PropTypes from 'prop-types';
import React from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/NativeSelect';
import styles from '../../../registration/styles.scss';
import {
  CATEGORY_TYPES,
  CATEGORY_TYPE_ALL,
  getCategoryTypeLabel,
} from '../../../../resources/category';
import { validateCategory } from '../../../../services/validatorService';

class EditCategoryForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        name: '',
        type: CATEGORY_TYPE_ALL,
      },
      formValidity: {
        elements: {
          name: null,
          type: null,
        },
        isValid: false,
      },
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.saveHandler = this.saveHandler.bind(this);
  }

  componentDidMount() {
    const {
      categoryList,
      id,
    } = this.props;

    const category = categoryList.find(iCategory => iCategory.id === id);

    this.setState({ formData: { ...category } });
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

    const formValidity = validateCategory(formData, { categoryList });

    this.setState({ formValidity });

    if (formValidity.isValid) {
      onSave(id, formData);
      onClose();
    }
  }

  render() {
    const { onClose } = this.props;
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
          Edit category
        </DialogTitle>
        <DialogContent>
          <FormControl
            className={styles.usernameField}
            error={!!formValidity.elements.name}
            required
          >
            <InputLabel htmlFor="name">
              Name
            </InputLabel>
            <Input
              autoFocus
              id="name"
              name="name"
              onChange={this.changeHandler}
              value={formData.name}
            />
            {formValidity.elements.name && (
              <FormHelperText>
                {formValidity.elements.name}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl
            className={styles.usernameField}
            error={!!formValidity.elements.type}
            required
          >
            <InputLabel htmlFor="name">
              Type
            </InputLabel>
            <Select
              value={formData.type}
              onChange={this.changeHandler}
              inputProps={{
                id: 'type',
                name: 'type',
              }}
            >
              {CATEGORY_TYPES.map(categoryType => (
                <option
                  key={categoryType}
                  value={categoryType}
                >
                  {getCategoryTypeLabel(categoryType)}
                </option>
              ))}
            </Select>
            {formValidity.elements.type && (
              <FormHelperText>
                {formValidity.elements.type}
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

EditCategoryForm.propTypes = {
  categoryList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(CATEGORY_TYPES).isRequired,
  })).isRequired,
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditCategoryForm;
