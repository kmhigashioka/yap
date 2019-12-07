import React from 'react';
import { Helmet } from 'react-helmet-async';
import { makeStyles, Snackbar } from '@material-ui/core';
import TransactionsPageContext from './TransactionsPageContext';
import { Transaction } from '../HomePage/types';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import { useHomePageContext } from '../HomePage/HomePageContext';
import request from '../../utils/request';

const useStyle = makeStyles({
  dataContainer: {},
  transactionsContainer: {
    display: 'flex',
    height: 'inherit',
  },
});

const TransactionsPage: React.FC = (): React.ReactElement => {
  const classes = useStyle();
  const [
    selectedTransaction,
    setSelectedTransaction,
  ] = React.useState<Transaction | null>(null);
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const { activeAccount } = useHomePageContext();

  React.useEffect(() => {
    const fetchTransactions = async (): Promise<void> => {
      const query =
        activeAccount === null ? '' : `?accountId=${activeAccount.id}`;
      const data = await request<Transaction[]>(
        `http://localhost:8000/api/transactions${query}`,
      );
      setTransactions(
        data.map(transaction => ({
          ...transaction,
          date: new Date(transaction.date),
        })),
      );
    };
    fetchTransactions();
  }, [activeAccount]);

  const handleCloseSnackbar = (): void => {
    setSnackbarMessage('');
  };

  return (
    <TransactionsPageContext.Provider
      value={{
        transactions,
        setTransactions,
      }}
    >
      <Helmet>
        <title>Transactions</title>
        <meta name="description" content="" />
      </Helmet>
      <div className={classes.transactionsContainer}>
        <TransactionList
          selectedTransaction={selectedTransaction}
          setSelectedTransaction={setSelectedTransaction}
          setSnackbarMessage={setSnackbarMessage}
        />
        <TransactionForm
          selectedTransaction={selectedTransaction}
          setSelectedTransaction={setSelectedTransaction}
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
