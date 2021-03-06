import React from 'react';
import { makeStyles } from '@material-ui/core';
import DashboardAccountItem from './DashboardAccountItem';
import { useHomePageContext } from '../HomePage/HomePageContext';
import { DashboardAccountListProps } from './types';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyleType: 'none',
    margin: 0,
    padding: '24px',
  },
});

const DashboardAccountList: React.FC<DashboardAccountListProps> = ({
  setSnackbarMessage,
}) => {
  const classes = useStyles();
  const { accounts } = useHomePageContext();

  return (
    <ul className={classes.container}>
      {accounts.map((account) => (
        <DashboardAccountItem
          key={account.id}
          account={account}
          setSnackbarMessage={setSnackbarMessage}
        />
      ))}
    </ul>
  );
};

export default DashboardAccountList;
