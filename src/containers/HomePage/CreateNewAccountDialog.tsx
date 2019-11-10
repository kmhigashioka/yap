import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useFormState } from 'react-use-form-state';
import { IFormDialogProps } from './types';

const CreateNewAccountDialog: React.FC<IFormDialogProps> = ({
  open,
  onClose,
  addAccount,
}) => {
  const [formState, { text, number }] = useFormState({
    name: '',
    abbreviation: '',
    startingBalance: 0,
  });

  const handleSubmit = (evt: React.FormEvent<EventTarget>): void => {
    evt.preventDefault();

    const { name, abbreviation, startingBalance } = formState.values;
    addAccount({
      id: new Date().getUTCMilliseconds(),
      name,
      abbreviation,
      balance: startingBalance,
      expenses: [],
    });
    formState.clear();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Create New Account</DialogTitle>
        <DialogContent>
          <TextField
            {...text('name')}
            autoFocus
            margin="dense"
            label="Name"
            required
            fullWidth
          />
          <TextField
            {...text('abbreviation')}
            margin="dense"
            label="Abbreviation (Maximum of 3 characters)"
            inputProps={{ maxLength: 3 }}
            required
            fullWidth
          />
          <TextField
            {...number('startingBalance')}
            margin="dense"
            label="Starting Balance"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateNewAccountDialog;