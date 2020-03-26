import React from 'react';
import { Helmet } from 'react-helmet-async';
import { makeStyles, Snackbar } from '@material-ui/core';
import TransactionsPageContext from './TransactionsPageContext';
import { Transaction } from '../HomePage/types';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import { useHomePageContext } from '../HomePage/HomePageContext';
import useFetch from '../../utils/useFetch';

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
  const { requestWithToken } = useFetch();

  React.useEffect(() => {
    const accountId = activeAccount === null ? null : activeAccount.id;
    const fetchTransactions = async (): Promise<void> => {
      const data = await requestWithToken<Transaction[]>(
        `/api/users/transactions?accountId=${accountId}`,
      );
      setTransactions(
        data.map(d => ({
          ...d,
          date: new Date(d.date),
        })),
      );
    };
    fetchTransactions();
  }, [activeAccount]);

  const addTransaction = (newTransaction: Transaction): void => {
    setTransactions([...transactions, newTransaction]);
  };

  const deleteTransaction = (transactionId: number): void => {
    setTransactions(
      transactions.filter(transaction => transaction.id !== transactionId),
    );
  };

  const editTransaction = (
    transactionId: number,
    newTransaction: Transaction,
  ): void => {
    setTransactions(
      transactions.map(transaction => {
        if (transaction.id === transactionId) {
          return {
            ...transaction,
            ...newTransaction,
          };
        }
        return { ...transaction };
      }),
    );
  };

  const handleCloseSnackbar = (): void => {
    setSnackbarMessage('');
  };

  return (
    <TransactionsPageContext.Provider
      value={{
        transactions,
        setTransactions,
        addTransaction,
        deleteTransaction,
        editTransaction,
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
