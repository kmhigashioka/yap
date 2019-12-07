import React from 'react';
import { TTransactionPageContext } from './types';

const TransactionsPageContext = React.createContext<
  TTransactionPageContext | undefined
>(undefined);

export const useTransactionsPageContext = (): TTransactionPageContext => {
  const context = React.useContext(TransactionsPageContext);
  if (context === undefined) {
    throw new Error(
      'useTransactionsPageContext must be used within a TransactionPageContextProvider',
    );
  }
  return context;
};

TransactionsPageContext.displayName = 'TransactionsPageContext';

export default TransactionsPageContext;
