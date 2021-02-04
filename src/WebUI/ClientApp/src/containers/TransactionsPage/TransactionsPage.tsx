import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Snackbar } from '@material-ui/core';
import { TransactionsPageProvider } from './TransactionsPageContext';
import { Transaction } from '../HomePage/types';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import { useHomePageContext } from '../HomePage/HomePageContext';

const TransactionsPage: React.FC = (): React.ReactElement => {
  const [
    selectedTransaction,
    setSelectedTransaction,
  ] = React.useState<Transaction | null>(null);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const transactionFormKeyCounter = React.useRef(0);
  const { activeAccount } = useHomePageContext();

  React.useEffect(() => {
    if (!openDrawer) {
      transactionFormKeyCounter.current += 1;
    }
  }, [openDrawer]);

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
    <TransactionsPageProvider
      activeAccount={activeAccount}
      setSnackbarMessage={setSnackbarMessage}
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
    </TransactionsPageProvider>
  );
};

export default TransactionsPage;
