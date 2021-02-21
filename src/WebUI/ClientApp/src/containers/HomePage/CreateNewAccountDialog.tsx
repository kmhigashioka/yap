import React from 'react';
import { FormState, StateErrors } from 'react-use-form-state';
import { FormDialogProps, Account } from './types';
import useFetch from '../../utils/useFetch';
import AccountDialogForm from '../../components/AccountDialogForm';
import { useNotificationContext } from '../Notification/NotificationContext';

const CreateNewAccountDialog: React.FC<FormDialogProps> = ({
  open,
  onClose,
  addAccount,
}) => {
  const { requestWithToken } = useFetch();
  const { setSnackbarMessage } = useNotificationContext();

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

  return (
    <AccountDialogForm open={open} onClose={onClose} onSubmit={handleSubmit} />
  );
};

export default CreateNewAccountDialog;
