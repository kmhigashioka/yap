import React from 'react';
import { THomePageContext } from './types';

const HomePageContext = React.createContext<THomePageContext>({
  transactions: [],
  deleteTransaction: () => {},
  addAccount: () => {},
  setActiveAccount: () => {},
  accounts: [],
  activeAccount: null,
  editTransaction: () => {},
  addTransaction: () => {},
});

HomePageContext.displayName = 'HomePageContext';

export default HomePageContext;
