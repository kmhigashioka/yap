import React from 'react';
import { TExpensesPageContext } from './types';

const TransactionsPageContext = React.createContext<TExpensesPageContext>({});

TransactionsPageContext.displayName = 'TransactionsPageContext';

export default TransactionsPageContext;
