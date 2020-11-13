import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)(
  ({ children, classes, onClose, ...other }) => {
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  }
);

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

export default function CustomizedDialogs({ open, setOpen }) {
  return (
    <div>
      <Dialog
        onClose={() => setOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={() => setOpen(false)}
        >
          Welcome to the Game!
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            The Game of Life is an algorithm meant to imitate cellular
            reproduction devised by the British mathematician John Conway in
            1970.
          </Typography>
          <Typography gutterBottom>
            It is a zero-player game, meaning that its evolution is determined
            by its initial state, requiring no further input. You play the Game
            of Life by creating an initial state of the field and watching what
            happens.
          </Typography>
          <Typography gutterBottom>
            You'll find pre-determined shapes in the drawer at the top; drag and
            drop these onto the grid to start. The controls on the left guide
            the game, and the slider on the right controls the speed.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            // autoFocus
            onClick={() => setOpen(false)}
            color="primary"
          >
            View the Demo
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
