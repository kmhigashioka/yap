import * as React from 'react';
import { makeStyles } from '@material-ui/core';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Lottie from 'react-lottie-player';
import animationData from './lottie-json/Empty.json';

const styles = { width: 300, height: 300 };

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    pointerEvents: 'none',
    '& *': {
      pointerEvents: 'auto',
    },
  },
});

interface EmptyProps {
  label: React.ReactNode;
}

const Empty: React.FC<EmptyProps> = ({ label }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Lottie loop={false} animationData={animationData} play style={styles} />
      {label}
    </div>
  );
};

export default Empty;
