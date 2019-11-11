import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  makeStyles,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Snackbar,
} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import EditOutlined from '@material-ui/icons/EditOutlined';
import { useFormState } from 'react-use-form-state';
import ExpensesPageContext from './ExpensesPageContext';
import { IExpensesPageProps } from './types';
import { Expense } from '../HomePage/types';
import DeleteExpenseDialog from './DeleteExpenseDialog';

const useStyle = makeStyles(theme => ({
  actionsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  bannerContainer: {
    backgroundColor: theme.palette.grey[200],
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    height: '160px',
    justifyContent: 'flex-end',
    minWidth: 'calc(100vw - 320px)',
    padding: '12px',
  },
  dataContainer: {},
  expensesContainer: {
    display: 'flex',
    height: 'inherit',
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
  expenseViewerContainer: {
    borderLeft: `1px solid ${theme.palette.grey[500]}`,
    width: '320px',
  },
  expenseViewerDetailsContainer: {
    padding: '12px',
  },
  fabContainer: {
    position: 'absolute',
    bottom: '-40px',
    left: '5px',
  },
  hoverable: {
    cursor: 'pointer',
  },
  tableHeader: {
    color: theme.palette.text.hint,
  },
  titleContainer: {
    padding: '0 0 0 80px',
    position: 'relative',
  },
}));

const ExpensesPage: React.FC<IExpensesPageProps> = ({
  expenses,
  deleteExpense,
}): React.ReactElement => {
  const classes = useStyle();
  const [formState, { text }] = useFormState();
  const [selectedExpense, setSelectedExpense] = React.useState<Expense | null>(
    null,
  );
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  React.useEffect(() => {
    if (selectedExpense === null) {
      return;
    }
    const { setField } = formState;
    setField('amount', selectedExpense.amount);
    setField('date', selectedExpense.date);
    setField('description', selectedExpense.description);
  }, [selectedExpense, formState]);

  const handleOnDelete = (): void => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = (): void => {
    setOpenDeleteDialog(false);
  };

  const handleProceedDeleteDialog = (): void => {
    if (selectedExpense === null) {
      return;
    }
    deleteExpense(selectedExpense.accountId, selectedExpense.id);
    setOpenDeleteDialog(false);
    setSelectedExpense(null);
    setSnackbarMessage('Expense successfully deleted.');
  };

  const handleCloseSnackbar = (): void => {
    setSnackbarMessage('');
  };

  return (
    <ExpensesPageContext.Provider value={{}}>
      <Helmet>
        <title>Expenses</title>
        <meta name="description" content="" />
      </Helmet>
      <div className={classes.expensesContainer}>
        <div>
          <div className={classes.bannerContainer}>
            <div className={classes.titleContainer}>
              <Fab color="primary" classes={{ root: classes.fabContainer }}>
                <AddIcon />
              </Fab>
              <Typography variant="h5">Expenses</Typography>
            </div>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell classes={{ root: classes.tableHeader }} />
                <TableCell classes={{ root: classes.tableHeader }}>
                  Category
                </TableCell>
                <TableCell classes={{ root: classes.tableHeader }}>
                  Amount
                </TableCell>
                <TableCell classes={{ root: classes.tableHeader }}>
                  Description
                </TableCell>
                <TableCell classes={{ root: classes.tableHeader }}>
                  Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map(expense => (
                <TableRow
                  key={expense.id}
                  hover
                  classes={{ root: classes.hoverable }}
                  onClick={(): void => {
                    setSelectedExpense(expense);
                  }}
                  selected={
                    selectedExpense !== null
                      ? selectedExpense.id === expense.id
                      : false
                  }
                >
                  <TableCell component="th" scope="row" />
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>{expense.amount}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{expense.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className={classes.expenseViewerContainer}>
          <form>
            <div className={classes.expenseViewerBannerContainer}>
              {selectedExpense === null ? null : (
                <>
                  <div className={classes.actionsContainer}>
                    <DeleteExpenseDialog
                      open={openDeleteDialog}
                      onClose={handleCloseDeleteDialog}
                      onProceed={handleProceedDeleteDialog}
                    />
                    <IconButton onClick={handleOnDelete}>
                      <DeleteOutline />
                    </IconButton>
                    <IconButton>
                      <EditOutlined />
                    </IconButton>
                  </div>
                  <div>
                    <Typography>{selectedExpense.category}</Typography>
                  </div>
                </>
              )}
            </div>
            <div className={classes.expenseViewerDetailsContainer}>
              {selectedExpense === null ? null : (
                <>
                  <TextField
                    type="number"
                    margin="dense"
                    label="Amount"
                    fullWidth
                    disabled
                    placeholder="Amount"
                    {...text('amount')}
                  />
                  <TextField
                    type="text"
                    margin="dense"
                    label="Description"
                    fullWidth
                    disabled
                    placeholder="Description"
                    {...text('description')}
                  />
                  <TextField
                    type="text"
                    margin="dense"
                    label="Date"
                    fullWidth
                    disabled
                    placeholder="Date"
                    {...text('date')}
                  />
                </>
              )}
            </div>
          </form>
        </div>
      </div>
      <Snackbar
        open={snackbarMessage !== ''}
        message={snackbarMessage}
        onClose={handleCloseSnackbar}
      />
    </ExpensesPageContext.Provider>
  );
};

export default ExpensesPage;
