import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

export default function AppSnackbar({
  key,
  anchorOrigin = { vertical: "top", horizontal: "center" },
  open,
  close,
  message,
  buttonText,
  buttonAction,
  closeAction
}) {
  function handleClose(event, reason) {
    if (reason === "clickaway") return;

    close();
    if (closeAction) closeAction();
  }

  return (
    <Snackbar
      key={key}
      anchorOrigin={anchorOrigin}
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
