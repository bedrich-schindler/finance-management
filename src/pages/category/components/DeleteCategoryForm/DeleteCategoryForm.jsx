import PropTypes from 'prop-types';
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class DeleteCategoryForm extends React.Component {
  constructor(props) {
    super(props);

    this.deleteHandler = this.deleteHandler.bind(this);
  }

  deleteHandler() {
    const {
      id,
      onClose,
      onDelete,
    } = this.props;

    onClose();
    onDelete(id);
  }

  render() {
    const { onClose } = this.props;

    return (
      <Dialog
        fullWidth
        maxWidth="xs"
        onClose={onClose}
        open
      >
        <DialogTitle>
          Delete category
        </DialogTitle>
        <DialogContent>
          Are your sure you want to delete this category?
        </DialogContent>
        <DialogActions>
          <Button onClick={this.deleteHandler} color="primary">
            Delete
          </Button>
          <Button onClick={onClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

DeleteCategoryForm.propTypes = {
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteCategoryForm;
