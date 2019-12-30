import React from 'react';
import { TDashboardPageContext } from './types';

const DashboardPageContext = React.createContext<TDashboardPageContext>({});

DashboardPageContext.displayName = 'DashboardPageContext';

export const useDashboardPageContext = (): TDashboardPageContext => {
  const context = React.useContext(DashboardPageContext);
  if (context === undefined) {
    throw new Error(
      'useDashboardPageContext should be used within DashboardPageContextProvider',
    );
  }
  return context;
};

export default DashboardPageContext;
