import React from 'react';
import { TTransactionPageContext } from './types';

const TransactionsPageContext = React.createContext<TTransactionPageContext>({});

TransactionsPageContext.displayName = 'TransactionsPageContext';

export default TransactionsPageContext;
