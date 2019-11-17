import React from 'react';
import { Helmet } from 'react-helmet-async';
import { makeStyles, Snackbar } from '@material-ui/core';
import TransactionsPageContext from './TransactionsPageContext';
import { IExpensesPageProps } from './types';
import { Expense } from '../HomePage/types';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';

const useStyle = makeStyles({
  dataContainer: {},
  expensesContainer: {
    display: 'flex',
    height: 'inherit',
  },
});

const TransactionsPage: React.FC<IExpensesPageProps> = (): React.ReactElement => {
  const classes = useStyle();
  const [selectedExpense, setSelectedExpense] = React.useState<Expense | null>(
    null,
  );
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const handleCloseSnackbar = (): void => {
    setSnackbarMessage('');
  };

  return (
    <TransactionsPageContext.Provider value={{}}>
      <Helmet>
        <title>Expenses</title>
        <meta name="description" content="" />
      </Helmet>
      <div className={classes.expensesContainer}>
        <TransactionList
          selectedExpense={selectedExpense}
          setSelectedExpense={setSelectedExpense}
          setSnackbarMessage={setSnackbarMessage}
        />
        <TransactionForm
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
    </TransactionsPageContext.Provider>
  );
};

export default TransactionsPage;
