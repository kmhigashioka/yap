import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { DeleteExpenseDialogProps } from './types';

const DeleteExpenseDialog: React.FC<DeleteExpenseDialogProps> = ({
  open,
  onClose,
  onProceed,
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Delete Expense?</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Are you sure you want to delete this expense?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button color="primary" onClick={onClose}>
        No
      </Button>
      <Button color="primary" onClick={onProceed}>Yes</Button>
    </DialogActions>
  </Dialog>
);

export default DeleteExpenseDialog;
