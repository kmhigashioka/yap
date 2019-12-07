import React from 'react';
import { Helmet } from 'react-helmet-async';
import { makeStyles, Snackbar } from '@material-ui/core';
import TransactionsPageContext from './TransactionsPageContext';
import { Transaction } from '../HomePage/types';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import { useHomePageContext } from '../HomePage/HomePageContext';
import useRequest from '../../utils/useRequest';

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

  const query = activeAccount === null ? '' : `?accountId=${activeAccount.id}`;
  const { data } = useRequest<Transaction[]>(
    { url: `${process.env.REACT_APP_API_URL}/api/transactions${query}` },
    [activeAccount],
  );

  React.useEffect(() => {
    if (data) {
      setTransactions(
        data.map(transaction => ({
          ...transaction,
          date: new Date(transaction.date),
        })),
      );
    }
  }, [data]);

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
