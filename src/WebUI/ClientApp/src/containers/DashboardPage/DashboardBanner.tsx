import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    alignItems: 'center',
    background: 'linear-gradient(to right, #122230 0%, #192d3e 100%)',
    boxSizing: 'border-box',
    display: 'flex',
    height: '160px',
    padding: '24px',
  },
  containerText: {
    color: '#fff',
    fontWeight: 300,
  },
});

const DashboardBanner = (): React.ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography className={classes.containerText} variant="h4">
        Welcome back, user!
      </Typography>
    </div>
  );
};

export default DashboardBanner;
