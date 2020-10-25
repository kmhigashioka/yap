import React from 'react';
import { makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import EditOutlined from '@material-ui/icons/EditOutlined';
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

import { TransactionFormProps, UpdateUserTransactionCommandVm } from './types';
import DeleteTransactionDialog from './DeleteTransactionDialog';
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
    justifyContent: 'flex-end',
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
}): React.ReactElement => {
  const classes = useStyles();
  const { updateAccountBalance } = useHomePageContext();
  const { deleteTransaction, editTransaction } = useTransactionsPageContext();
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [formState, { text, raw, select }] = useFormState({
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

  const handleOnEdit = (): void => {
    setIsEditing(true);
  };

  const resetForm = React.useCallback(() => {
    const { setField } = formState;
    setField('amount', selectedTransaction.amount);
    setField('date', selectedTransaction.date);
    setField('description', selectedTransaction.description);
    setField('type', selectedTransaction.type);
  }, [selectedTransaction, formState]);

  const handleOnCancelEdit = (): void => {
    setIsEditing(false);
    resetForm();
  };

  const handleFormSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
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
        setIsEditing(false);
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
    resetForm();
  }, [resetForm]);

  return (
    <div className={classes.transactionViewerContainer}>
      <form onSubmit={handleFormSubmit}>
        <div className={classes.transactionViewerBannerContainer}>
          <>
            <div className={classes.actionsContainer}>
              <DeleteTransactionDialog
                open={openDeleteDialog}
                onClose={handleCloseDeleteDialog}
                onProceed={handleProceedDeleteDialog}
              />
              {isEditing ? (
                <IconButton
                  onClick={handleOnCancelEdit}
                  data-testid="cancel-edit-transaction"
                >
                  <Close />
                </IconButton>
              ) : (
                <>
                  <IconButton
                    onClick={handleOnDelete}
                    data-testid="delete-transaction"
                  >
                    <DeleteOutline />
                  </IconButton>
                  <IconButton
                    onClick={handleOnEdit}
                    data-testid="edit-transaction"
                  >
                    <EditOutlined />
                  </IconButton>
                </>
              )}
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
                disabled={!isEditing}
                placeholder="Type"
                value={formState.values.type}
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
              type="number"
              margin="dense"
              label="Amount"
              fullWidth
              disabled={!isEditing}
              placeholder="Amount"
              {...text('amount')}
            />
            <TextField
              type="text"
              margin="dense"
              label="Description"
              fullWidth
              disabled={!isEditing}
              placeholder="Description"
              {...text('description')}
            />
            <KeyboardDatePicker
              className={classes.fieldRoot}
              value={formState.values.date}
              disableToolbar
              variant="inline"
              format="MM/DD/YYYY"
              label="Date"
              placeholder="Date"
              fullWidth
              disabled={!isEditing}
              autoOk
              {...raw({
                name: 'date',
                onChange: (date) => date && date.toDate(),
                validate: () => true,
              })}
            />
            {isEditing ? (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className={classes.submitEditButton}
                type="submit"
              >
                Save
              </Button>
            ) : null}
          </>
        </div>
      </form>
    </div>
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
