import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useFormState } from 'react-use-form-state';
import { makeStyles, FormControl, InputLabel } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { AddTransactionDialogProps } from './types';
import { useHomePageContext } from '../HomePage/HomePageContext';
import {
  Transaction,
  TransactionType,
  NewUserTransactionCommandVm,
} from '../HomePage/types';
import { useTransactionsPageContext } from './TransactionsPageContext';
import useFetch from '../../utils/useFetch';
import Dialog from '../../components/Dialog';

const useStyles = makeStyles({
  fieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '400px',
    maxWidth: '100%',
  },
  fieldRoot: {
    margin: '8px 0 4px 0',
  },
});

const AddTransactionDialog: React.FC<AddTransactionDialogProps> = ({
  open,
  onClose,
  setSnackbarMessage,
  categories,
}): React.ReactElement => {
  const { activeAccount } = useHomePageContext();
  const { addTransaction } = useTransactionsPageContext();
  const [formState, { text, raw, select }] = useFormState({
    category: '',
    amount: 0,
    description: '',
    date: new Date(),
    accountId: activeAccount === null ? 0 : activeAccount.id,
    type: TransactionType.Expense,
  });
  const classes = useStyles();
  const { accounts, updateAccountBalance } = useHomePageContext();
  const { values } = formState;

  const { requestWithToken } = useFetch();

  React.useEffect(() => {
    if (activeAccount === null) {
      return;
    }
    formState.setField('accountId', activeAccount.id);
  }, [activeAccount, formState]);

  const handleOnSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    const category = categories.find((c) => c.id === values.category);

    if (!category) {
      setSnackbarMessage('Please select a category.');
      return;
    }

    if (values.accountId <= 0) {
      setSnackbarMessage('Please select an account.');
      return;
    }

    const transaction: Transaction = {
      accountId: values.accountId,
      amount: values.amount,
      category,
      date: values.date,
      description: values.description,
      id: 0,
      type: values.type,
    };
    const pushTransaction = async (): Promise<void> => {
      try {
        const data = await requestWithToken<NewUserTransactionCommandVm>(
          `/api/users/transactions?accountId=${values.accountId}`,
          {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              transactions: [transaction],
              accountId: transaction.accountId,
            }),
          },
        );
        setSnackbarMessage('Transaction successfully created.');
        onClose();
        formState.reset();
        data.transactions.forEach((d) => {
          addTransaction({
            ...d,
            date: new Date(d.date),
          });
        });
        updateAccountBalance(data.account.id, data.account.balance);
      } catch (error) {
        const errorResponse = await error.response.json();
        setSnackbarMessage(errorResponse.message);
      }
    };
    pushTransaction();
  };

  const handleChangeAccount = (
    event: React.ChangeEvent<{ value: unknown }>,
  ): void => {
    formState.setField('accountId', event.target.value);
  };

  const handleCancel = (): void => {
    onClose();
    formState.reset();
  };

  const handleChangeCategory = (
    event: React.ChangeEvent<{ value: unknown }>,
  ): void => {
    formState.setField('category', event.target.value);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <form name="add-transaction-form" onSubmit={handleOnSubmit}>
        <DialogTitle>Add Transaction</DialogTitle>
        <DialogContent>
          <div className={classes.fieldContainer}>
            <FormControl classes={{ root: classes.fieldRoot }}>
              <InputLabel>Type</InputLabel>
              <Select
                placeholder="Type"
                data-testid="select-type"
                {...select({
                  name: 'type',
                  onChange: (event) => event.target.value,
                  validate: () => true,
                })}
              >
                <MenuItem value={TransactionType.Expense}>Expense</MenuItem>
                <MenuItem value={TransactionType.Income}>Income</MenuItem>
              </Select>
            </FormControl>
            <FormControl classes={{ root: classes.fieldRoot }}>
              <InputLabel>Category</InputLabel>
              <Select
                placeholder="Category"
                onChange={handleChangeCategory}
                data-testid="select-category"
                value={values.category}
              >
                {categories.map((category) => (
                  <MenuItem key={category.name} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              label="Amount"
              placeholder="Amount"
              {...text('amount')}
            />
            <TextField
              margin="dense"
              label="Description"
              placeholder="Description"
              {...text('description')}
            />
            <KeyboardDatePicker
              className={classes.fieldRoot}
              disableToolbar
              variant="inline"
              format="MM/DD/YYYY"
              label="Date"
              placeholder="Date"
              autoOk
              {...raw({
                name: 'date',
                onChange: (date) => date && date.toDate(),
              })}
            />
            <FormControl classes={{ root: classes.fieldRoot }}>
              <InputLabel>Account</InputLabel>
              <Select
                placeholder="Account"
                value={values.accountId === 0 ? '' : values.accountId}
                onChange={handleChangeAccount}
                data-testid="select-account"
              >
                {accounts.map((account) => (
                  <MenuItem key={account.id} value={account.id}>
                    {account.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button color="primary" type="submit">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddTransactionDialog;
