import React from "react";

// Material UI Component Imports
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";

// App Component imports
import { DialogTitle, DialogContent, DialogActions } from "./AppDialog";

// Welcome Dialog for the app home page
export default function WelcomeDialog({ open, setOpen, setTourStep }) {
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
            onClick={() => {
              // Close the dialog
              setOpen(false);

              // Take a tour button automatically starts the tour
              setTourStep(1);
            }}
            color="primary"
          >
            Take a Tour
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
