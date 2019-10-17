import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  welcomeContainer: {
    backgroundColor: theme.palette.primary.main,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '100px',
    width: 'calc(100vw - 400px)',
  },
  welcomeText: {
    color: '#fff',
    fontWeight: 100,
    margin: '0 0 10px 0',
  },
  welcomeBodyText: {
    color: '#fff',
  },
}));

const Welcome: React.FC<{}> = (): React.ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.welcomeContainer}>
      <Typography className={classes.welcomeText} variant="h3">
        Welcome!
      </Typography>
      <Typography className={classes.welcomeBodyText} variant="body2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        ullamcorper nisl erat, vel convallis elit fermentum pellentesque. Sed
        mollis velit facilisis facilisis.
      </Typography>
    </div>
  );
};

export default Welcome;
