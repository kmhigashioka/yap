import * as React from 'react';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const CustomDialog: React.FC<DialogProps> = (props): React.ReactElement => {
  const xsDeviceMatches = useMediaQuery('(max-width:320px)');

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Dialog {...props} fullScreen={xsDeviceMatches} />;
};

export default CustomDialog;
