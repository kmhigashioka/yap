import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormState, StateErrors, useFormState } from 'react-use-form-state';

interface AccountDialogFormProps {
  onClose: () => void;
  onSubmit: (
    evt: React.FormEvent<EventTarget>,
    formState: FormState<unknown, StateErrors<unknown, string>>,
  ) => void;
  title?: string;
  proceedButtonText?: string;
}

const AccountDialogForm: React.FC<AccountDialogFormProps> = ({
  onClose,
  onSubmit,
  title,
  proceedButtonText,
}) => {
  const [formState, { text, number }] = useFormState({
    name: '',
    abbreviation: '',
    balance: 0,
  });

  const handleSubmit = (evt: React.FormEvent<EventTarget>): void => {
    evt.preventDefault();
    onSubmit(evt, formState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          {...text('name')}
          autoFocus
          margin="dense"
          label="Name"
          required
          fullWidth
          placeholder="Name"
        />
        <TextField
          {...text('abbreviation')}
          margin="dense"
          label="Abbreviation (Maximum of 3 characters)"
          inputProps={{ maxLength: 3 }}
          required
          fullWidth
          placeholder="Abbreviation (Maximum of 3 characters)"
        />
        <TextField
          {...number('balance')}
          margin="dense"
          label="Starting Balance"
          fullWidth
          placeholder="Starting Balance"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button type="submit" color="primary">
          {proceedButtonText}
        </Button>
      </DialogActions>
    </form>
  );
};

AccountDialogForm.defaultProps = {
  title: 'Create New Account',
  proceedButtonText: 'Create',
};

export default AccountDialogForm;
