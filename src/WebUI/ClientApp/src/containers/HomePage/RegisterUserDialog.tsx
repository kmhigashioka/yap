import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useFormState } from 'react-use-form-state';

import Dialog from '../../components/Dialog';
import useFetch from '../../utils/useFetch';
import { useHomePageContext } from './HomePageContext';
import { User } from './types';

interface RegisterUserDialogProps {
  open: boolean;
  onClose: () => void;
  setSnackbarMessage: (message: string) => void;
}

const fields = {
  FULLNAME: 'fullName',
  USERNAME: 'userName',
  EMAIL: 'email',
  PASSWORD: 'password',
  CONFIRMPASSWORD: 'confirmPassword',
};

const RegisterUserDialog: React.FC<RegisterUserDialogProps> = ({
  open,
  onClose,
  setSnackbarMessage,
}) => {
  const [formState, { text, email, password }] = useFormState();
  const { requestWithToken } = useFetch();
  const { setCurrentUser, currentUser } = useHomePageContext();

  function handleSubmit(evt: React.FormEvent<EventTarget>): void {
    evt.preventDefault();
    const { values } = formState;

    const hasError = values.password === values.confirmPassword;
    formState.setFieldError(
      fields.PASSWORD,
      hasError ? '' : 'Password and Confirm Password did not match.',
    );

    async function updateGuest(): Promise<void> {
      try {
        await requestWithToken('/api/guests', {
          method: 'put',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setSnackbarMessage('User successfully registered.');

        if (!currentUser) {
          return;
        }

        const updatedCurrentUser: User = {
          ...currentUser,
          email: values.email,
          fullName: values.fullName,
          isGuest: false,
        };
        setCurrentUser(updatedCurrentUser);
        onClose();
      } catch (error) {
        const errorResponse = await error.response.json();
        setSnackbarMessage(errorResponse.message);
      }
    }

    if (hasError) {
      updateGuest();
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Register User</DialogTitle>
        <DialogContent>
          <TextField
            {...text(fields.FULLNAME)}
            autoFocus
            margin="dense"
            label="Name"
            required
            fullWidth
            placeholder="John Doe"
          />
          <TextField
            {...email(fields.EMAIL)}
            margin="dense"
            label="Email Address"
            required
            fullWidth
            placeholder="johndoe@example.com"
          />
          <TextField
            {...text(fields.USERNAME)}
            margin="dense"
            label="Username"
            required
            fullWidth
            placeholder="johndoe"
          />
          <TextField
            {...password(fields.PASSWORD)}
            margin="dense"
            label="Password"
            fullWidth
            required
            error={Boolean(formState.errors[fields.PASSWORD])}
            helperText={formState.errors[fields.PASSWORD]}
          />
          <TextField
            {...password(fields.CONFIRMPASSWORD)}
            margin="dense"
            label="Confirm Password"
            fullWidth
            required
            error={Boolean(formState.errors[fields.PASSWORD])}
            helperText={formState.errors[fields.PASSWORD]}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Register
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default RegisterUserDialog;
