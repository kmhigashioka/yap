import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Snackbar } from '@material-ui/core';

import DashboardPageContext from './DashboardPageContext';
import DashboardBanner from './DashboardBanner';
import DashboardAccountList from './DashboardAccountList';
import { useHomePageContext } from '../HomePage/HomePageContext';

const DashboardPage: React.FC = () => {
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const handleCloseSnackbar = (): void => {
    setSnackbarMessage('');
  };
  const { currentUser, accounts } = useHomePageContext();

  return (
    <DashboardPageContext.Provider value={{}}>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Description of DashboardPage" />
      </Helmet>
      <DashboardBanner
        fullName={currentUser?.fullName}
        hasAccount={accounts.length > 0}
      />
      <DashboardAccountList setSnackbarMessage={setSnackbarMessage} />
      <Snackbar
        autoHideDuration={6000}
        open={snackbarMessage !== ''}
        message={snackbarMessage}
        onClose={handleCloseSnackbar}
      />
    </DashboardPageContext.Provider>
  );
};

export default DashboardPage;
