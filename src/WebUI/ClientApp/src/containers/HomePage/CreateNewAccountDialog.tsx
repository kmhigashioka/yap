import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Snackbar from '@material-ui/core/Snackbar';
import { FormState, StateErrors } from 'react-use-form-state';
import { FormDialogProps, Account } from './types';
import useFetch from '../../utils/useFetch';
import AccountDialogForm from '../../components/AccountDialogForm';

const CreateNewAccountDialog: React.FC<FormDialogProps> = ({
  open,
  onClose,
  addAccount,
}) => {
  const { requestWithToken } = useFetch();
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const handleSubmit = (
    evt: React.FormEvent<EventTarget>,
    formState: FormState<unknown, StateErrors<unknown, string>>,
  ): void => {
    evt.preventDefault();

    const newAccountRequest = async (): Promise<void> => {
      const data = await requestWithToken<Account>('/api/Accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          account: formState.values,
        }),
      });
      addAccount(data);
      formState.clear();
      onClose();
      setSnackbarMessage('New account successfully created.');
    };

    newAccountRequest();
  };

  const handleCloseSnackbar = (): void => {
    setSnackbarMessage('');
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <AccountDialogForm onClose={onClose} onSubmit={handleSubmit} />
      </Dialog>
      <Snackbar
        autoHideDuration={6000}
        open={snackbarMessage !== ''}
        message={snackbarMessage}
        onClose={handleCloseSnackbar}
      />
    </>
  );
};

export default CreateNewAccountDialog;
