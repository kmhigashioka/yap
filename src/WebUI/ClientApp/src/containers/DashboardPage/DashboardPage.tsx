import React from 'react';
import { Helmet } from 'react-helmet-async';
import { makeStyles, Typography } from '@material-ui/core';

import DashboardBanner from './DashboardBanner';
import DashboardAccountList from './DashboardAccountList';
import { useHomePageContext } from '../HomePage/HomePageContext';
import Empty from '../../components/Empty';
import { useNotificationContext } from '../Notification/NotificationContext';

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
  const { setSnackbarMessage } = useNotificationContext();
  const { currentUser, accounts } = useHomePageContext();
  const classes = useStyles();

  return (
    <>
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
    </>
  );
};

export default DashboardPage;
