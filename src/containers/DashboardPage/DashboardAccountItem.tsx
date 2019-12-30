import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { DashboardAccountItemProps } from './types';

const useStyles = makeStyles(theme => ({
  container: {
    borderRadius: '4px',
    border: `1px solid ${theme.palette.secondary.light}`,
    margin: '0 16px 16px 0',
    minWidth: '300px',
  },
  header: {
    alignItems: 'center',
    backgroundColor: theme.palette.secondary.main,
    borderTopLeftRadius: 'inherit',
    borderTopRightRadius: 'inherit',
    color: theme.palette.secondary.contrastText,
    display: 'flex',
    height: '64px',
    padding: '0 24px',
  },
  body: {
    alignItems: 'center',
    display: 'flex',
    padding: '24px',
  },
}));

const DashboardAccountItem: React.FC<DashboardAccountItemProps> = ({
  account,
}): React.ReactElement => {
  const classes = useStyles();

  return (
    <li className={classes.container}>
      <div className={classes.header}>
        <Typography>{account.name}</Typography>
      </div>
      <div className={classes.body}>
        <Typography>{account.balance}</Typography>
      </div>
    </li>
  );
};

export default DashboardAccountItem;
