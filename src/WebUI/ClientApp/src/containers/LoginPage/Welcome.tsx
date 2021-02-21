import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  welcomeContainer: {
    backgroundColor: theme.palette.primary.main,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '10vw',
    width: 'calc(100vw - 400px)',
  },
  welcomeContainerXsToMd: {
    padding: '50px',
    width: '100%',
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

interface WelcomeProps {
  xsToMdDeviceMatches?: boolean;
}

const Welcome: React.FC<WelcomeProps> = ({
  xsToMdDeviceMatches,
}): React.ReactElement => {
  const classes = useStyles();

  return (
    <div
      className={`${classes.welcomeContainer} ${
        xsToMdDeviceMatches ? classes.welcomeContainerXsToMd : ''
      }`}
    >
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
