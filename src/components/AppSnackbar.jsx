import React from "react";

// Material UI Component imports
import MuiAlert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

// Component to be used for any snackbar update to the user
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
  // Component for using the experimental Material UI Alert API
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  // Function to handle closing the snackbar
  function handleClose(event, reason) {
    if (reason === "clickaway" || alert) return;

    close();
    if (closeAction) closeAction();
  }

  return alert ? (
    // If alert it truthy, return an Alert wrapped in the Snackbar componment
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
    // If alert is falsy, return a self-closing Snackbar component
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
