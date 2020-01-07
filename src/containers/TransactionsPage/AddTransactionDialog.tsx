import React from 'react';
import Dialog from '@material-ui/core/Dialog';
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
import { Transaction, TransactionType } from '../HomePage/types';
import { useTransactionsPageContext } from './TransactionsPageContext';
import request from '../../utils/request';
import useRequest from '../../utils/useRequest';
import { Category } from '../CategoryPage/types';

const useStyles = makeStyles({
  fieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '400px',
  },
  fieldRoot: {
    margin: '8px 0 4px 0',
  },
});

const AddTransactionDialog: React.FC<AddTransactionDialogProps> = ({
  open,
  onClose,
  setSnackbarMessage,
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
  const { accounts } = useHomePageContext();
  const { values } = formState;
  const [categories, setCategories] = React.useState<Category[]>([]);

  const { data: supportedCategories } = useRequest<Category[]>(
    {
      url: `${process.env.REACT_APP_API_URL}/api/usercategories?userId=1&display=true&sort=name`,
    },
    [],
  );

  React.useEffect(() => {
    if (supportedCategories) {
      setCategories(supportedCategories);
    }
  }, [supportedCategories]);

  React.useEffect(() => {
    if (activeAccount === null) {
      return;
    }
    formState.setField('accountId', activeAccount.id);
  }, [activeAccount, formState]);

  const handleOnSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    const transaction: Transaction = {
      accountId: values.accountId,
      amount: values.amount,
      category: values.category,
      date: values.date,
      description: values.description,
      id: 0,
      type: values.type,
    };
    const pushTransaction = async (): Promise<void> => {
      const data = await request<Transaction>(
        `${process.env.REACT_APP_API_URL}/api/transactions`,
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(transaction),
        },
      );
      data.date = new Date(data.date);
      addTransaction(data);
    };
    pushTransaction();
    setSnackbarMessage('Transaction successfully created.');
    onClose();
    formState.reset();
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
                value={values.type}
                {...select({
                  name: 'type',
                  onChange: event => event.target.value,
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
                {categories.map(category => (
                  <MenuItem key={category.name} value={category.name}>
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
              value={values.date}
              disableToolbar
              variant="inline"
              format="MM/DD/YYYY"
              label="Date"
              placeholder="Date"
              autoOk
              {...raw({
                name: 'date',
                onChange: date => date && date.toDate(),
                validate: () => true,
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
                {accounts.map(account => (
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
