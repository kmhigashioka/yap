import React from 'react';
import { THomePageContext } from './types';

const HomePageContext = React.createContext<THomePageContext>({
  expenses: [],
  deleteExpense: () => {},
  addAccount: () => {},
  setActiveAccount: () => {},
  accounts: [],
  activeAccount: null,
});

HomePageContext.displayName = 'HomePageContext';

export default HomePageContext;
