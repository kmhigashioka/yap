import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface PromptDialogProps {
  open: boolean;
  onClose: () => void;
  onProceed: () => void;
  title: string;
  contentText: string;
}

const PromptDialog: React.FC<PromptDialogProps> = ({
  onClose,
  open,
  title,
  contentText,
  onProceed,
}) => {
  const handleClose = (): void => {
    onClose();
  };

  const handleProceed = (): void => {
    onProceed();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleProceed} color="primary">
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PromptDialog;
