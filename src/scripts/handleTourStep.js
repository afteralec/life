// Function to encapsulate all management of the current step of the app tour
export default function handleTourStep(
  tourStep,
  setTourStep,
  setSnackbar,
  clear,
  setDrawerOpen
) {
  switch (tourStep) {
    // Tour step one
    case 1:
      setSnackbar((snackbar) => ({
        ...snackbar,
        key: new Date().getTime(),
        open: true,
        message: "The Game is played on this grid",
        buttonText: "next",
        buttonAction: () => setTourStep(2),
        closeAction: () => {
          setTourStep(0);
          clear();
        }
      }));

      break;

    // Tour step two
    case 2:
      setSnackbar((snackbar) => ({
        ...snackbar,
        key: new Date().getTime(),
        open: true,
        message: "Click or drag over any cell to toggle it",
        buttonText: "next",
        buttonAction: () => {
          setTourStep(4);
          clear();
        },
        closeAction: () => {
          setTourStep(0);
          clear();
        }
      }));

      break;

    // Tour step three
    case 3:
      setSnackbar((snackbar) => ({
        ...snackbar,
        open: true,
        key: new Date().getTime(),
        anchorOrigin: { vertical: "bottom", horizontal: "center" },
        message: "Push the Game forward and back one step in time",
        buttonText: "next",
        buttonAction: () => {
          setTourStep(4);
          clear();
        },
        closeAction: () => {
          setTourStep(0);
          clear();
        }
      }));

      break;

    // Tour step four
    case 4:
      setSnackbar((snackbar) => ({
        ...snackbar,
        open: true,
        key: new Date().getTime(),
        anchorOrigin: { vertical: "bottom", horizontal: "center" },
        message: "When you've set an initial state, press Play",
        buttonText: "next",
        buttonAction: () => setTourStep(5),
        closeAction: () => {
          setTourStep(0);
          clear();
        }
      }));

      break;

    // Tour step five
    case 5:
      setSnackbar((snackbar) => ({
        ...snackbar,
        open: true,
        key: new Date().getTime(),
        anchorOrigin: { vertical: "bottom", horizontal: "left" },
        message: "Clear the grid with the Clear button",
        buttonText: "next",
        buttonAction: () => {
          setTourStep(6);
          setDrawerOpen(true);
        },
        closeAction: () => {
          setTourStep(0);
          clear();
        }
      }));

      break;

    // Tour step six
    case 6:
      setSnackbar((snackbar) => ({
        ...snackbar,
        anchorOrigin: { vertical: "top", horizontal: "center" },
        open: true,
        key: new Date().getTime(),
        message:
          "Prebuilt shapes can be dragged onto the grid for interesting effects",
        buttonText: "next",
        buttonAction: () => {
          setTourStep(7);
          setDrawerOpen(false);
        },
        closeAction: () => {
          setTourStep(0);
          clear();
        }
      }));

      break;

    // Tour step seven
    case 7:
      setSnackbar((snackbar) => ({
        ...snackbar,
        open: true,
        key: new Date().getTime(),
        message: "Have fun!",
        buttonText: undefined,
        buttonAction: undefined,
        autoHideDuration: 5000,
        alert: "success"
      }));

      break;

    // Default required by switch statement
    default:
      break;
  }
}
