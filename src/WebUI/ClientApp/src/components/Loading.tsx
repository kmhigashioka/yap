import * as React from 'react';
import { makeStyles } from '@material-ui/core';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import Lottie from 'react-lottie-player';
import animationData from './lottie-json/lf30_editor_yd2p1jqt.json';

const styles = { width: 150, height: 150 };
const useStyle = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
  },
});

const Loading: React.FC = () => {
  const classes = useStyle();

  return (
    <div className={classes.container}>
      <Lottie loop animationData={animationData} play style={styles} />
    </div>
  );
};

export default Loading;
