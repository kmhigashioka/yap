import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Snackbar } from '@material-ui/core';
import TransactionsPageContext from './TransactionsPageContext';
import { Transaction, Account } from '../HomePage/types';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import { useHomePageContext } from '../HomePage/HomePageContext';
import useFetch from '../../utils/useFetch';

const TransactionsPage: React.FC = (): React.ReactElement => {
  const [
    selectedTransaction,
    setSelectedTransaction,
  ] = React.useState<Transaction | null>(null);
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const transactionFormKeyCounter = React.useRef(0);
  const { activeAccount } = useHomePageContext();
  const { requestWithToken } = useFetch();

  React.useEffect(() => {
    const fetchTransactions = async (
      account: Account | null,
    ): Promise<void> => {
      const accountId = account === null ? null : account.id;
      try {
        const data = await requestWithToken<Transaction[]>(
          `/api/users/transactions?accountId=${accountId}`,
        );
        setTransactions(
          data.map((d) => ({
            ...d,
            date: new Date(d.date),
          })),
        );
      } catch (error) {
        setSnackbarMessage(error.message);
      }
    };

    fetchTransactions(activeAccount);
  }, [activeAccount, requestWithToken]);

  React.useEffect(() => {
    if (!openDrawer) {
      transactionFormKeyCounter.current += 1;
    }
  }, [openDrawer]);

  const addTransaction = (newTransaction: Transaction): void => {
    setTransactions([...transactions, newTransaction]);
  };

  const deleteTransaction = (transactionId: number): void => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== transactionId),
    );
  };

  const editTransaction = (
    transactionId: number,
    newTransaction: Transaction,
  ): void => {
    setTransactions(
      transactions.map((transaction) => {
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

  const handleCloseDrawer = (): void => {
    setOpenDrawer(false);
  };

  const handleItemClick = (transaction: Transaction | null): void => {
    setSelectedTransaction(transaction);
    setOpenDrawer(true);
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
      <TransactionList
        selectedTransaction={selectedTransaction}
        setSnackbarMessage={setSnackbarMessage}
        onItemClick={handleItemClick}
      />
      <TransactionForm
        key={`TransactionFormKey${transactionFormKeyCounter.current}`}
        open={openDrawer}
        onClose={handleCloseDrawer}
        selectedTransaction={selectedTransaction}
        setSelectedTransaction={setSelectedTransaction}
        setSnackbarMessage={setSnackbarMessage}
      />
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
