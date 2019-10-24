import React from 'react';
import { TExpensesPageContext } from './types';

const ExpensesPageContext = React.createContext<TExpensesPageContext>({});

ExpensesPageContext.displayName = 'ExpensesPageContext';

export default ExpensesPageContext;
