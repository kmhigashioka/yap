import React from 'react';
import { TTransactionPageContext } from './types';
import { Transaction } from '../HomePage/types';
import useFetch from '../../utils/useFetch';

const TransactionsPageContext = React.createContext<
  TTransactionPageContext | undefined
>(undefined);

export function useTransactionsPageContext(): TTransactionPageContext {
  const context = React.useContext(TransactionsPageContext);
  if (context === undefined) {
    throw new Error(
      'useTransactionsPageContext must be used within a TransactionPageContextProvider',
    );
  }
  return context;
}

TransactionsPageContext.displayName = 'TransactionsPageContext';

export function TransactionsPageProvider({
  children,
  activeAccountId,
  setSnackbarMessage,
}: {
  activeAccountId: number | null;
  children: React.ReactNode;
  setSnackbarMessage: (message: string) => void;
}): React.ReactElement {
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const { requestWithToken } = useFetch();

  React.useEffect(() => {
    const fetchTransactions = async (
      accountId: number | null,
    ): Promise<void> => {
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

    fetchTransactions(activeAccountId);
  }, [activeAccountId, requestWithToken, setSnackbarMessage]);

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

  const value = {
    transactions,
    setTransactions,
    addTransaction,
    deleteTransaction,
    editTransaction,
  };

  return (
    <TransactionsPageContext.Provider value={value}>
      {children}
    </TransactionsPageContext.Provider>
  );
}
