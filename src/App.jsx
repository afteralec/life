import React, { useState, useEffect } from "react";

// Material UI imports
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CssBaseline from "@material-ui/core/CssBaseline";

// App Component imports
import Grid from "./components/Grid";
import Controls from "./components/Controls";
import ShapesAccordion from "./components/ShapesAccordion";
import ShapesAccordionShape from "./components/ShapesAccordionShape";
import WelcomeDialog from "./components/WelcomeDialog";
import AppSnackbar from "./components/AppSnackbar";

// App data imports
import shapes from "./data/shapes";
import seeds from "./data/seeds";

// App helper function imports
import splitId from "./helpers/splitId";

// App script file imports
import renderShape from "./scripts/renderShape";
import generateGrid from "./scripts/generateGrid";
import handleTourStep from "./scripts/handleTourStep";

export default function App() {
  const [playing, setPlaying] = useState(false),
    [grid, setGrid] = useState(generateGrid()),
    [timeStep, setTimeStep] = useState(1000),
    [selectedShape, selectShape] = useState(""),
    [hoverPoint, setHoverPoint] = useState({}),
    [mouseDown, setMouseDown] = useState(false),
    [dragging, setDrag] = useState(false),
    [drawerOpen, setDrawerOpen] = useState(false),
    [welcomeOpen, setWelcomeOpen] = useState(true),
    [snackbar, setSnackbar] = useState({}),
    [tourStep, setTourStep] = useState(0);

  const mobile = useMediaQuery("(max-width: 1023px)");

  // Play the game
  useEffect(() => {
    let gameInterval;
    if (playing) {
      gameInterval = setInterval(step, timeStep);
    }

    // Return value is the cleanup function for useEffect, clearing the interval
    return () => clearInterval(gameInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  // Effect to moderate the tour and set the appropriate snackbar
  useEffect(() => {
    handleTourStep(tourStep, setTourStep, setSnackbar, clear, setDrawerOpen);

    // In tour step two, set an interval to simulate cells activating and deactivating
    let tourCellInterval;
    if (tourStep === 2) {
      tourCellInterval = setInterval(() => {
        const newGrid = [...grid];
        setGrid(seeds.tourExample(newGrid));
      }, 1000);
    }

    // Return value is the cleanup function for useEffect()
    return () => clearInterval(tourCellInterval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tourStep]);

  // Function to close any open snackbar
  function closeSnackbar() {
    setSnackbar((snackbar) => ({ ...snackbar, open: false }));
  }

  // Function to encapsulate starting the game
  function play() {
    setPlaying(true);
  }

  // Function to encapsulate pausing the game
  function pause() {
    setPlaying(false);
  }

  // Function to clear the grid
  function clear() {
    pause();

    // Set the grid to a completely new generated grid
    setGrid(generateGrid());
  }

  // Function to encapsulate moving the game forward each time step
  function step() {
    // Copy the grid so React recognizes a change
    const newGrid = [...grid];

    // Tag for discovering if the state of the game has stabilitized
    let stable = true;

    // Apply the rules to each cell of the grid before changing anything
    for (const row of newGrid) {
      for (const cell of row) {
        cell.applyRules(grid);

        // If the cell's state is different from the last step,
        //   set stable to false
        if (cell.active !== cell.willBeActive) stable = false;
      }
    }

    // If nothing has changed through the entire iteration, pause the game
    if (stable) pause();

    // Having applied the rules, play the game on each cell of the grid
    for (const row of newGrid) {
      for (const cell of row) {
        cell.play();
      }
    }

    // Set the grid to the new state
    setGrid(newGrid);
  }

  // Function to encapsulate moving the game back one time step
  function back() {
    const newGrid = [...grid];

    for (const row of newGrid) {
      for (const cell of row) {
        cell.back();
      }
    }

    setGrid(newGrid);
  }

  // Function to encapsulate toggling an individual cell;
  //   only intended to be use on a single click - not on each time step
  function toggleActive(id) {
    const newGrid = [...grid],
      pos = splitId(id),
      cell = newGrid[pos[0]][pos[1]];

    cell.wasActive = cell.active;
    cell.active = !cell.active;

    if (tourStep === 2) setTourStep((tourStep) => tourStep + 1);
    setGrid(newGrid);
  }

  // Function to "drop" a shape from the custom drag, contained in state selectedShape
  function dropShape(row, col) {
    for (const id in renderShape(hoverPoint, selectedShape)) {
      const [row, col] = splitId(id);

      if (!grid[row][col]) continue;

      grid[row][col].active = true;
    }

    setGrid(grid);
  }

  // Function to create an array of components for the drawer of prebuilt shapes
  //   at the top of the UI
  function renderAccordionShapes(shapes) {
    const renderedShapes = [];
    let rule = false;

    // Iterate each key in the shapes object
    for (const shape in shapes) {
      const rows = shapes[shape].accordion.rows || shapes[shape].rows,
        cols = shapes[shape].accordion.cols || shapes[shape].cols,
        center = shapes[shape].accordion.center || shapes[shape].center;

      // Render a <hr> element before every shape after the first
      if (rule) renderedShapes.push(<hr key={`rule-${shapes[shape].name}`} />);
      rule = true;

      renderedShapes.push(
        <ShapesAccordionShape
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

    // Return the final array of rule-separated components
    return renderedShapes;
  }

  return (
    <>
      <CssBaseline
      // Baseline component to provide style reset from Material UI
      />
      <div
        style={{
          marginTop: mobile ? "0" : "3vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: dragging ? "grabbing" : "auto",
          overflow: mobile ? "hidden" : "",
          position: mobile ? "fixed" : ""
        }}
        // Tracking the state of the mouse globally
        onMouseDown={() => {
          setMouseDown(true);

          // If we're on the final step of the tour, any mouse action resets it
          if (tourStep === 7) {
            setTourStep(0);
            setSnackbar({});
          }
        }}
        // Tracking the state of the mouse globally here
        onMouseUp={() => {
          setDrag(false);
          setMouseDown(false);

          // If the user is on the final step of the tour, any mouse action resets it
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
      </div>

      <WelcomeDialog
        // Welcome dialog with app summary
        open={welcomeOpen}
        setOpen={setWelcomeOpen}
        setTourStep={setTourStep}
      />

      <AppSnackbar key={snackbar.message} close={closeSnackbar} {...snackbar} />
    </>
  );
}
