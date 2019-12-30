import React from 'react';
import { TDashboardPageContext } from './types';

const DashboardPageContext = React.createContext<TDashboardPageContext>({});

DashboardPageContext.displayName = 'DashboardPageContext';

export default DashboardPageContext;
