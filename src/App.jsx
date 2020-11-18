import React, { useState, useEffect } from "react";

// Material UI Component imports
import CssBaseline from "@material-ui/core/CssBaseline";

// App Component imports
import Grid from "./components/Grid";
import Controls from "./components/Controls";
import ShapesAccordion from "./components/ShapesAccordion";
import AccordionShape from "./components/AccordionShape";
import ContextMenu from "./components/ContextMenu";
import WelcomeDialog from "./components/WelcomeDialog";
import AppSnackbar from "./components/AppSnackbar";

// App javaScript service file imports
import generateGrid from "./services/generateGrid";
import splitId from "./services/splitId";
import shapes from "./services/shapes";
import renderShape from "./services/renderShape";
import seeds from "./services/seeds";

export default function App() {
  const [playing, setPlaying] = useState(false),
    [grid, setGrid] = useState(generateGrid()),
    [timeStep, setTimeStep] = useState(1000),
    [selectedShape, selectShape] = useState(""),
    [hoverPoint, setHoverPoint] = useState({}),
    [mouse, setMouse] = useState({ x: null, y: null }),
    [mouseDown, setMouseDown] = useState(false),
    [dragging, setDrag] = useState(false),
    [drawerOpen, setDrawerOpen] = useState(false),
    [welcomeOpen, setWelcomeOpen] = useState(true),
    [snackbar, setSnackbar] = useState({}),
    [tourStep, setTourStep] = useState(0);

  // Play the game
  useEffect(() => {
    let gameInterval;
    if (playing) {
      gameInterval = setInterval(step, timeStep);
    }

    return () => clearInterval(gameInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  // Effect to moderate the tour
  useEffect(() => {
    switch (tourStep) {
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
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tourStep]);

  // Effect to simulate cells activating and deactivating
  useEffect(() => {
    let tourCellInterval;
    if (tourStep === 2) {
      tourCellInterval = setInterval(() => {
        const newGrid = [...grid];
        setGrid(seeds.tourExample(newGrid));
      }, 1000);
    }
    return () => clearInterval(tourCellInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tourStep]);

  function handleCloseMenu() {
    setMouse({ x: null, y: null });
  }

  function closeSnackbar() {
    setSnackbar((snackbar) => ({ ...snackbar, open: false }));
  }

  function play() {
    setPlaying(true);
  }

  function pause() {
    setPlaying(false);
  }

  function clear() {
    pause();
    setGrid(generateGrid());
  }

  function step() {
    const newGrid = [...grid];

    let stable = true;
    for (const row of newGrid) {
      for (const cell of row) {
        cell.applyRules(grid);
        if (cell.active !== cell.willBeActive) stable = false;
      }
    }

    if (stable) pause();

    for (const row of newGrid) {
      for (const cell of row) {
        cell.play();
      }
    }

    setGrid(newGrid);
  }

  function back() {
    const newGrid = [...grid];

    for (const row of newGrid) {
      for (const cell of row) {
        cell.back();
      }
    }

    setGrid(newGrid);
  }

  function toggleActive(id) {
    const newGrid = [...grid],
      pos = splitId(id),
      cell = newGrid[pos[0]][pos[1]];

    cell.wasActive = cell.active;
    cell.active = !cell.active;

    if (tourStep === 2) setTourStep((tourStep) => tourStep + 1);
    setGrid(newGrid);
  }

  function dropShape(row, col) {
    for (const id in renderShape(hoverPoint, selectedShape)) {
      const [row, col] = splitId(id);

      if (!grid[row][col]) continue;

      grid[row][col].active = true;
    }

    setGrid(grid);
  }

  function renderAccordionShapes(shapes) {
    const renderedShapes = [];
    let rule = false;

    for (const shape in shapes) {
      const rows = shapes[shape].accordion.rows || shapes[shape].rows,
        cols = shapes[shape].accordion.cols || shapes[shape].cols,
        center = shapes[shape].accordion.center || shapes[shape].center;

      if (rule) renderedShapes.push(<hr key={`rule-${shapes[shape].name}`} />);
      rule = true;

      renderedShapes.push(
        <AccordionShape
          key={shapes[shape].name}
          rows={rows}
          cols={cols}
          center={center}
          name={shapes[shape].name}
          label={shapes[shape].label}
          setExpanded={setDrawerOpen}
          selectShape={selectShape}
          dropShape={dropShape}
          setHoverPoint={setHoverPoint}
          dragging={dragging}
          setDrag={setDrag}
          rule={rule}
          tour={tourStep === 6}
          setTourStep={setTourStep}
        />
      );
    }

    return renderedShapes;
  }

  return (
    <>
      <CssBaseline
      // Baseline component to provide style reset from Material UI
      />
      <div
        style={{
          marginTop: "3vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: dragging ? "grabbing" : "auto"
        }}
        //onContextMenu={handleContextMenu}
        onMouseDown={() => {
          setMouseDown(true);
          if (tourStep === 7) {
            setTourStep(0);
            setSnackbar({});
          }
        }}
        onMouseUp={() => {
          setDrag(false);
          setMouseDown(false);
          if (tourStep === 7) {
            setTourStep(0);
            setSnackbar({});
          }
        }}
      >
        <ShapesAccordion
          // Shapes drawer at the top of the UI
          renderedAccordionShapes={renderAccordionShapes(shapes)}
          drawerOpen={drawerOpen || tourStep === 6}
          setDrawerOpen={setDrawerOpen}
          tour={tourStep === 6}
          setTourStep={setTourStep}
        />

        <Grid
          // The main grid on the UI; this is where the game is played
          grid={grid}
          toggleActive={toggleActive}
          hoverPoint={hoverPoint}
          setHoverPoint={setHoverPoint}
          hoverShape={renderShape(hoverPoint, selectedShape)}
          dragging={dragging}
          setDrag={setDrag}
          selectShape={selectShape}
          dropShape={dropShape}
          tour={tourStep === 1}
          mouseDown={mouseDown}
        />

        <Controls
          // Controls for back, play, pause, and forward
          style={{
            opacity: drawerOpen || tourStep === 6 ? 0 : 1,
            transition: "all 100ms ease",
            transitionDelay: !(drawerOpen || tourStep === 6) ? "250ms" : ""
          }}
          playing={playing}
          play={play}
          pause={pause}
          clear={clear}
          step={step}
          back={back}
          timeStep={timeStep}
          setTimeStep={setTimeStep}
          tour={{
            play: tourStep === 4,
            clear: tourStep === 5
          }}
          setTourStep={setTourStep}
          setGrid={setGrid}
        />

        <ContextMenu
          mouse={mouse}
          clear={clear}
          handleCloseMenu={handleCloseMenu}
          setGrid={setGrid}
        />
      </div>

      <WelcomeDialog
        // Welcome dialog with app summary
        open={welcomeOpen}
        setOpen={setWelcomeOpen}
        setTourStep={setTourStep}
      />

      <AppSnackbar
        key={snackbar.message}
        anchorOrigin={snackbar.anchorOrigin}
        autoHideDuration={snackbar.autoHideDuration}
        open={snackbar.open}
        close={closeSnackbar}
        message={snackbar.message}
        buttonText={snackbar.buttonText}
        buttonAction={snackbar.buttonAction}
        closeAction={snackbar.closeAction}
        alert={snackbar.alert}
      />
    </>
  );
}
