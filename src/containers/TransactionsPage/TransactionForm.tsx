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

import { TransactionFormProps } from './types';
import DeleteTransactionDialog from './DeleteTransactionDialog';
import useHomePageContext from '../HomePage/useHomePageContext';

const useStyles = makeStyles(theme => ({
  expenseViewerContainer: {
    borderLeft: `1px solid ${theme.palette.grey[500]}`,
    width: '320px',
  },
  expenseViewerBannerContainer: {
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
  expenseViewerDetailsContainer: {
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
  const { deleteExpense, editExpense } = useHomePageContext();
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [formState, { text, raw }] = useFormState({
    date: new Date(),
  });

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
    deleteExpense(selectedTransaction.accountId, selectedTransaction.id);
    setOpenDeleteDialog(false);
    setSelectedTransaction(null);
    setSnackbarMessage('Expense successfully deleted.');
  };

  const handleOnEdit = (): void => {
    setIsEditing(true);
  };

  const handleOnCancelEdit = (): void => {
    if (selectedTransaction === null) {
      return;
    }
    setIsEditing(false);
    const { setField } = formState;
    setField('amount', selectedTransaction.amount);
    setField('date', selectedTransaction.date);
    setField('description', selectedTransaction.description);
  };

  const handleFormSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    if (selectedTransaction === null) {
      return;
    }
    editExpense(selectedTransaction.accountId, selectedTransaction.id, {
      ...selectedTransaction,
      ...formState.values,
    });
    setSnackbarMessage('Expense successfully updated.');
    setIsEditing(false);
  };

  React.useEffect(() => {
    if (selectedTransaction === null) {
      return;
    }
    const { setField } = formState;
    setField('amount', selectedTransaction.amount);
    setField('date', selectedTransaction.date);
    setField('description', selectedTransaction.description);
  }, [selectedTransaction, formState]);

  return (
    <div className={classes.expenseViewerContainer}>
      <form onSubmit={handleFormSubmit}>
        <div className={classes.expenseViewerBannerContainer}>
          {selectedTransaction === null ? null : (
            <>
              <div className={classes.actionsContainer}>
                <DeleteTransactionDialog
                  open={openDeleteDialog}
                  onClose={handleCloseDeleteDialog}
                  onProceed={handleProceedDeleteDialog}
                />
                {isEditing ? (
                  <IconButton onClick={handleOnCancelEdit}>
                    <Close />
                  </IconButton>
                ) : (
                  <>
                    <IconButton onClick={handleOnDelete}>
                      <DeleteOutline />
                    </IconButton>
                    <IconButton onClick={handleOnEdit}>
                      <EditOutlined />
                    </IconButton>
                  </>
                )}
              </div>
              <div>
                <Typography>{selectedTransaction.category}</Typography>
              </div>
            </>
          )}
        </div>
        <div className={classes.expenseViewerDetailsContainer}>
          {selectedTransaction === null ? null : (
            <>
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
                  onChange: date => date && date.toDate(),
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
          )}
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
