import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { DashboardBannerProps } from './types';

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

const DashboardBanner: React.FC<DashboardBannerProps> = ({
  fullName,
  hasAccount,
}) => {
  const classes = useStyles();
  const hasAccountRef = React.useRef(hasAccount);
  const welcomeMessage = hasAccountRef.current
    ? `Welcome back, ${fullName}!`
    : `Welcome, ${fullName}!`;

  React.useEffect(() => {
    if (hasAccount) {
      hasAccountRef.current = true;
    }
  }, [hasAccount]);

  return (
    <div className={classes.container}>
      <Typography className={classes.containerText} variant="h4">
        {welcomeMessage}
      </Typography>
    </div>
  );
};

export default DashboardBanner;
