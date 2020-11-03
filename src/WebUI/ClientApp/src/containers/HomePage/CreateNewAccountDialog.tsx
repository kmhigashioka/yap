import React from 'react';
import Dialog from '@material-ui/core/Dialog';
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
    };

    newAccountRequest();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <AccountDialogForm onClose={onClose} onSubmit={handleSubmit} />
    </Dialog>
  );
};

export default CreateNewAccountDialog;
