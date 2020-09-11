import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CustomSnackBar(props: any): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Snackbar
        open={props.snackBarStatus}
        autoHideDuration={6000}
        onClose={props.closeSnackBar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={props.closeSnackBar} severity={props.snackBarType}>
          {props.snackBarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CustomSnackBar;
