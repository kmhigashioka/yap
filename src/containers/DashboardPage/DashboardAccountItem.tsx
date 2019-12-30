import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

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

const DashboardAccountItem = (): React.ReactElement => {
  const classes = useStyles();

  return (
    <li className={classes.container}>
      <div className={classes.header}>
        <Typography>Sample Account</Typography>
      </div>
      <div className={classes.body}>
        <Typography>P 1,320.00</Typography>
      </div>
    </li>
  );
};

export default DashboardAccountItem;
