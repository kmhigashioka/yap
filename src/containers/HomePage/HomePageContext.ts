import React from 'react';
import { THomePageContext } from './types';

const HomePageContext = React.createContext<THomePageContext>({
  expenses: [],
  deleteExpense: () => {},
  addAccount: () => {},
  setActiveAccount: () => {},
});

HomePageContext.displayName = 'HomePageContext';

export default HomePageContext;
