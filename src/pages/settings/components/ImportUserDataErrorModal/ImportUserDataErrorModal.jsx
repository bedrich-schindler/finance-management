import PropTypes from 'prop-types';
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const ImportUserDataErrorModal = (props) => {
  const { onClose } = props;

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      onClose={onClose}
      open
    >
      <DialogTitle>
        Import failed
      </DialogTitle>
      <DialogContent />
      <DialogActions>
        <Button onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ImportUserDataErrorModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ImportUserDataErrorModal;
