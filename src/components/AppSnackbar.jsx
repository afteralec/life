import React from "react";

// Material UI Component imports
import MuiAlert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

export default function AppSnackbar({
  key,
  anchorOrigin = { vertical: "top", horizontal: "center" },
  autoHideDuration,
  open,
  close,
  message,
  buttonText,
  buttonAction,
  closeAction,
  alert
}) {
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  function handleClose(event, reason) {
    if (reason === "clickaway" || alert) return;

    close();
    if (closeAction) closeAction();
  }

  return alert ? (
    <Snackbar
      key={key}
      anchorOrigin={anchorOrigin}
      autoHideDuration={autoHideDuration}
      open={open}
      onClose={handleClose}
    >
      <Alert autoHideDuration={autoHideDuration} severity={alert}>
        {message}
      </Alert>
    </Snackbar>
  ) : (
    <Snackbar
      key={key}
      anchorOrigin={anchorOrigin}
      autoHideDuration={autoHideDuration}
      open={open}
      onClose={handleClose}
      message={message}
      action={
        <>
          {buttonText && (
            <Button
              color="secondary"
              size="small"
              onClick={() => {
                handleClose();
                if (buttonAction) buttonAction();
              }}
            >
              {buttonText}
            </Button>
          )}
          {closeAction && (
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </>
      }
    />
  );
}
