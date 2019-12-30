import React from 'react';
import { makeStyles } from '@material-ui/core';
import DashboardAccountItem from './DashboardAccountItem';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyleType: 'none',
    margin: 0,
    padding: '24px',
  },
});

const DashboardAccountList = (): React.ReactElement => {
  const classes = useStyles();

  return (
    <ul className={classes.container}>
      {Array.from({ length: 5 }).map((_, i) => (
        <DashboardAccountItem key={i} />
      ))}
    </ul>
  );
};

export default DashboardAccountList;
