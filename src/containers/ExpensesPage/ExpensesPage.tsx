import React from 'react';
import { Helmet } from 'react-helmet-async';
import { makeStyles, Snackbar } from '@material-ui/core';
import ExpensesPageContext from './ExpensesPageContext';
import { IExpensesPageProps } from './types';
import { Expense } from '../HomePage/types';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';

const useStyle = makeStyles({
  dataContainer: {},
  expensesContainer: {
    display: 'flex',
    height: 'inherit',
  },
});

const ExpensesPage: React.FC<IExpensesPageProps> = (): React.ReactElement => {
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
        <ExpenseList
          selectedExpense={selectedExpense}
          setSelectedExpense={setSelectedExpense}
          setSnackbarMessage={setSnackbarMessage}
        />
        <ExpenseForm
          selectedExpense={selectedExpense}
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
