import React from 'react';
import { makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Close from '@material-ui/icons/Close';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { useFormState } from 'react-use-form-state';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Drawer from '@material-ui/core/Drawer';

import { TransactionFormProps, UpdateUserTransactionCommandVm } from './types';
import PromptDialog from '../../components/PromptDialog';
import { Account, TransactionType } from '../HomePage/types';
import { useTransactionsPageContext } from './TransactionsPageContext';
import useFetch from '../../utils/useFetch';
import { useHomePageContext } from '../HomePage/HomePageContext';

const useStyles = makeStyles((theme) => ({
  transactionViewerContainer: {
    borderLeft: `1px solid ${theme.palette.grey[500]}`,
    width: '320px',
  },
  transactionViewerBannerContainer: {
    backgroundColor: theme.palette.grey[300],
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    height: '160px',
    padding: '12px',
    justifyContent: 'space-between',
  },
  actionsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  transactionViewerDetailsContainer: {
    padding: '12px',
  },
  submitEditButton: {
    margin: '20px 0 0 0',
  },
  fieldRoot: {
    margin: '8px 0 4px 0',
  },
}));

const TransactionForm: React.FC<TransactionFormProps> = ({
  selectedTransaction,
  setSelectedTransaction,
  setSnackbarMessage,
  open,
  onClose,
}): React.ReactElement => {
  const classes = useStyles();
  const { updateAccountBalance } = useHomePageContext();
  const { deleteTransaction, editTransaction } = useTransactionsPageContext();
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [formState, { text, raw, select, number }] = useFormState({
    date: new Date(),
  });
  const { requestWithToken } = useFetch();

  const handleOnDelete = (): void => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = (): void => {
    setOpenDeleteDialog(false);
  };

  const handleProceedDeleteDialog = (): void => {
    if (selectedTransaction === null) {
      return;
    }
    const requestDeleteTransaction = async (): Promise<void> => {
      try {
        const data = await requestWithToken<Account>(
          `/api/users/transactions/${selectedTransaction.id}`,
          {
            method: 'delete',
          },
        );
        deleteTransaction(selectedTransaction.id);
        setOpenDeleteDialog(false);
        setSelectedTransaction(null);
        setSnackbarMessage('Transaction successfully deleted.');
        updateAccountBalance(data.id, data.balance);
      } catch (error) {
        const errorResponse = await error.response.json();
        setSnackbarMessage(errorResponse.message);
      }
    };
    requestDeleteTransaction();
  };

  const handleOnCancelEdit = (event: React.MouseEvent): void => {
    onClose(event);
  };

  const handleFormSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    if (selectedTransaction === null) {
      return;
    }
    const editedTransaction = {
      ...selectedTransaction,
      ...formState.values,
    };
    const updateTransaction = async (): Promise<void> => {
      try {
        const data = await requestWithToken<UpdateUserTransactionCommandVm[]>(
          '/api/users/transactions',
          {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'put',
            body: JSON.stringify({
              transactions: [editedTransaction],
            }),
          },
        );
        editTransaction(selectedTransaction.id, editedTransaction);
        setSnackbarMessage('Transaction successfully updated.');
        setSelectedTransaction(editedTransaction);
        data.forEach((d) => {
          updateAccountBalance(d.account.id, d.account.balance);
        });
      } catch (error) {
        const errorResponse = await error.response.json();
        setSnackbarMessage(errorResponse.message);
      }
    };
    updateTransaction();
  };

  React.useEffect(() => {
    if (selectedTransaction === null) {
      return;
    }
    const { setField } = formState;
    setField('amount', selectedTransaction.amount);
    setField('date', selectedTransaction.date);
    setField('description', selectedTransaction.description);
    setField('type', selectedTransaction.type);
  }, [selectedTransaction, formState]);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      {selectedTransaction === null ? (
        <TransactionFormPlaceholder />
      ) : (
        <div className={classes.transactionViewerContainer}>
          <form onSubmit={handleFormSubmit}>
            <div className={classes.transactionViewerBannerContainer}>
              <>
                <div className={classes.actionsContainer}>
                  <PromptDialog
                    title="Delete Transaction"
                    contentText="Are you sure you want to delete this transaction?"
                    open={openDeleteDialog}
                    onClose={handleCloseDeleteDialog}
                    onProceed={handleProceedDeleteDialog}
                  />
                  <IconButton
                    onClick={handleOnCancelEdit}
                    data-testid="cancel-edit-transaction"
                  >
                    <Close />
                  </IconButton>
                  <IconButton
                    onClick={handleOnDelete}
                    data-testid="delete-transaction"
                  >
                    <DeleteOutline />
                  </IconButton>
                </div>
                <div>
                  <Typography>{selectedTransaction.category.name}</Typography>
                </div>
              </>
            </div>
            <div className={classes.transactionViewerDetailsContainer}>
              <>
                <FormControl fullWidth classes={{ root: classes.fieldRoot }}>
                  <InputLabel>Type</InputLabel>
                  <Select
                    fullWidth
                    placeholder="Type"
                    {...select({
                      name: 'type',
                      onChange: (event) => event.target.value,
                      validate: () => true,
                    })}
                    SelectDisplayProps={{
                      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                      // @ts-ignore
                      'data-testid': 'select-transaction-type',
                    }}
                  >
                    <MenuItem value={TransactionType.Expense}>Expense</MenuItem>
                    <MenuItem value={TransactionType.Income}>Income</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  margin="dense"
                  label="Amount"
                  fullWidth
                  placeholder="Amount"
                  {...number('amount')}
                />
                <TextField
                  margin="dense"
                  label="Description"
                  fullWidth
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
                  fullWidth
                  autoOk
                  {...raw({
                    name: 'date',
                    onChange: (date) => date && date.toDate(),
                    validate: () => true,
                  })}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  className={classes.submitEditButton}
                  type="submit"
                >
                  Save
                </Button>
              </>
            </div>
          </form>
        </div>
      )}
    </Drawer>
  );
};

export default TransactionForm;

export const TransactionFormPlaceholder: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.transactionViewerContainer}>
      <div className={classes.transactionViewerBannerContainer} />
      <div className={classes.transactionViewerDetailsContainer} />
    </div>
  );
};
