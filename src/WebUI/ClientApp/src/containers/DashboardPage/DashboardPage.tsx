import React from 'react';
import { Helmet } from 'react-helmet-async';
import { makeStyles, Snackbar, Typography } from '@material-ui/core';

import DashboardPageContext from './DashboardPageContext';
import DashboardBanner from './DashboardBanner';
import DashboardAccountList from './DashboardAccountList';
import { useHomePageContext } from '../HomePage/HomePageContext';
import Empty from '../../components/Empty';

const useStyles = makeStyles({
  placeholderContainer: {
    display: 'flex',
    height: 'calc(100% - 160px)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  placeholderLabel: {
    position: 'absolute',
    bottom: '20px',
    textAlign: 'center',
  },
  placeholderLabelButton: {
    cursor: 'pointer',
  },
});

const DashboardPage: React.FC = () => {
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const handleCloseSnackbar = (): void => {
    setSnackbarMessage('');
  };
  const { currentUser, accounts } = useHomePageContext();
  const classes = useStyles();

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
      {accounts.length > 0 ? (
        <DashboardAccountList setSnackbarMessage={setSnackbarMessage} />
      ) : (
        <div className={classes.placeholderContainer}>
          <Empty
            label={
              <div className={classes.placeholderLabel}>
                <Typography variant="body1">There are no acconts.</Typography>
                <Typography
                  className={classes.placeholderLabelButton}
                  variant="body1"
                  color="secondary"
                  component="label"
                  htmlFor="appbar-toolbar-account-selection-button"
                >
                  CREATE ONE HERE
                </Typography>
              </div>
            }
          />
        </div>
      )}
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
