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
import { AddExpenseDialogProps } from './types';
import useHomePageContext from '../HomePage/useHomePageContext';
import { Expense } from '../HomePage/types';

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

const AddExpenseDialog: React.FC<AddExpenseDialogProps> = ({
  open,
  onClose,
  setSnackbarMessage,
}): React.ReactElement => {
  const { activeAccount, addExpense } = useHomePageContext();
  const [formState, { text, raw }] = useFormState({
    category: '',
    amount: 0,
    description: '',
    date: new Date(),
    accountId: activeAccount === null ? 0 : activeAccount.id,
  });
  const classes = useStyles();
  const { accounts } = useHomePageContext();
  const { values } = formState;

  React.useEffect(() => {
    if (activeAccount === null) {
      return;
    }
    formState.setField('accountId', activeAccount.id);
  }, [activeAccount, formState]);

  const handleOnSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    const expense: Expense = {
      accountId: values.accountId,
      amount: values.amount,
      category: values.category,
      date: values.date,
      description: values.description,
      id: new Date().getUTCMilliseconds(),
    };
    addExpense(values.accountId, expense);
    setSnackbarMessage('Expense successfully created.');
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

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleOnSubmit}>
        <DialogTitle>Add Expense</DialogTitle>
        <DialogContent>
          <div className={classes.fieldContainer}>
            <TextField
              margin="dense"
              label="Category"
              placeholder="Category"
              {...text('category')}
            />
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

export default AddExpenseDialog;
