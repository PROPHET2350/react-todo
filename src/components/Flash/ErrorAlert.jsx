import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { Slide } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

const ErrorAlert = props => {
  return (
    <Snackbar
      open={props.open}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={props.onClose ? props.onClose : null}
      TransitionComponent={TransitionUp}
      key={'TransitionUp'}
      autoHideDuration={1500}
    >
      <MuiAlert
        onClose={props.onClose ? props.onClose : null}
        severity={props.AlertType}
      >
        {props.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default ErrorAlert;
