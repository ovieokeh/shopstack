import React, { useState } from 'react';
import clsx from 'clsx';
import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { CheckCircle, Error, Close } from '@material-ui/icons/';
import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core';

const variantIcon = {
  success: CheckCircle,
  error: Error,
};

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const SnackBar = ({ message, variant }) => {
  const classes = useStyles();
  const Icon = variantIcon[variant];

  const [state, setState] = useState({
    vertical: 'top',
    horizontal: 'center',
    open: true,
  });

  const { vertical, horizontal } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
    window.location.href = '/customer';
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={`${vertical},${horizontal}`}
        open={state.open}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
      >
        <SnackbarContent
          className={clsx(classes[variant])}
          message={
            <span id="client-snackbar" className={classes.message}>
              <Icon className={clsx(classes.icon, classes.iconVariant)} />
              {message}
            </span>
          }
          action={[
            <IconButton key="close" aria-label="Close" color="inherit" onClick={handleClose}>
              <Close className={classes.icon} />
            </IconButton>,
          ]}
        />
      </Snackbar>
    </div>
  );
};

export default SnackBar;
