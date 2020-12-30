import React from 'react';
import { FormState, StateErrors } from 'react-use-form-state';
import useFetch from '../../utils/useFetch';
import AccountDialogForm from '../../components/AccountDialogForm';
import { EditAccountDialogProps } from './types';
import { Account } from '../HomePage/types';

const EditAccountDialog: React.FC<EditAccountDialogProps> = ({
  open,
  onClose,
  account,
  editAccount,
  setSnackbarMessage,
}) => {
  const { requestWithToken } = useFetch();

  const handleSubmit = (
    evt: React.FormEvent<EventTarget>,
    formState: FormState<unknown, StateErrors<unknown, string>>,
  ): void => {
    evt.preventDefault();

    const editAccountRequest = async (): Promise<void> => {
      try {
        const data = await requestWithToken<Account>('/api/users/accounts', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            account: formState.values,
          }),
        });
        setSnackbarMessage('Account successfully updated.');
        editAccount(data.id, data);
      } catch (error) {
        const errorResponse = await error.response.json();
        setSnackbarMessage(errorResponse.message);
      }
    };

    editAccountRequest();
  };

  return (
    <AccountDialogForm
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Edit Account Information"
      proceedButtonText="Save"
      initialState={account}
    />
  );
};

export default EditAccountDialog;
