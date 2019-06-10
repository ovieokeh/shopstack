import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const AlertDialogSlide = props => {
  const { title, content, setOpen, open, fullWidth, maxWidth, okButtonText } = props;

  const handleClose = () => setOpen(false);

  return (
    <div className="alert-dialog">
      <Dialog
        open={open}
        TransitionComponent={Transition}
        fullWidth={fullWidth || false}
        maxWidth={maxWidth || 'sm'}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {okButtonText || 'Ok'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialogSlide;
