import React from 'react';
import { Helmet } from 'react-helmet-async';

import DashboardPageContext from './DashboardPageContext';
import DashboardBanner from './DashboardBanner';
import DashboardAccountList from './DashboardAccountList';

const DashboardPage = () => (
  <DashboardPageContext.Provider value={{}}>
    <Helmet>
      <title>Dashboard</title>
      <meta name="description" content="Description of DashboardPage" />
    </Helmet>
    <DashboardBanner />
    <DashboardAccountList />
  </DashboardPageContext.Provider>
);

export default DashboardPage;
