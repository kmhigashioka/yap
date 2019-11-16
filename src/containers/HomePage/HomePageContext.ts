import React from 'react';
import { THomePageContext } from './types';

const HomePageContext = React.createContext<THomePageContext>({
  expenses: [],
  deleteExpense: () => {},
  addAccount: () => {},
  setActiveAccount: () => {},
  accounts: [],
  activeAccount: null,
  editExpense: () => {},
  addExpense: () => {},
});

HomePageContext.displayName = 'HomePageContext';

export default HomePageContext;
