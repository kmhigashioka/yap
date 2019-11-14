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
  Snackbar,
} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ExpensesPageContext from './ExpensesPageContext';
import { IExpensesPageProps } from './types';
import { Expense } from '../HomePage/types';
import useHomePageState from '../HomePage/useHomePageState';
import ExpenseForm from './ExpenseForm';

const useStyle = makeStyles(theme => ({
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

const ExpensesPage: React.FC<IExpensesPageProps> = (): React.ReactElement => {
  const { expenses, deleteExpense, editExpense } = useHomePageState();
  const classes = useStyle();
  const [selectedExpense, setSelectedExpense] = React.useState<Expense | null>(
    null,
  );
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

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
        <ExpenseForm
          selectedExpense={selectedExpense}
          deleteExpense={deleteExpense}
          editExpense={editExpense}
          setSelectedExpense={setSelectedExpense}
          setSnackbarMessage={setSnackbarMessage}
        />
      </div>
      <Snackbar
        autoHideDuration={6000}
        open={snackbarMessage !== ''}
        message={snackbarMessage}
        onClose={handleCloseSnackbar}
      />
    </ExpensesPageContext.Provider>
  );
};

export default ExpensesPage;
