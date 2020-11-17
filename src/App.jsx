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

// App javaScript service file imports
import generateGrid from "./services/generateGrid";
import splitId from "./services/splitId";
import shapes from "./services/shapes";
import renderShape from "./services/renderShape";

export default function App() {
  const [playing, setPlaying] = useState(false),
    [grid, setGrid] = useState(generateGrid()),
    [timeStep, setTimeStep] = useState(1000),
    [selectedShape, selectShape] = useState(""),
    [hoverPoint, setHoverPoint] = useState({}),
    [mouseDown, setMouseDown] = useState(false),
    [mouse, setMouse] = useState({ x: null, y: null }),
    [dragging, setDrag] = useState(false),
    [drawerOpen, setDrawerOpen] = useState(false),
    [welcomeOpen, setWelcomeOpen] = useState(true);

  // Play the game
  useEffect(() => {
    let gameInterval;

    if (playing) {
      gameInterval = setInterval(step, timeStep);
    }

    return () => clearInterval(gameInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  function handleContextMenu(event) {
    event.preventDefault();
    setMouse({
      x: event.clientX - 2,
      y: event.clientY - 4
    });
  }

  function handleCloseMenu() {
    setMouse({ x: null, y: null });
  }

  function play() {
    setPlaying(true);
  }

  function pause() {
    setPlaying(false);
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
        onContextMenu={handleContextMenu}
        onMouseDown={() => {
          setMouseDown(true);
        }}
        onMouseUp={() => {
          setDrag(false);
          setMouseDown(false);
        }}
      >
        <ShapesAccordion
          // Shapes drawer at the top of the UI
          renderedAccordionShapes={renderAccordionShapes(shapes)}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
        />

        <Grid
          // The main grid on the UI; this is where the game is played
          grid={grid}
          toggleActive={toggleActive}
          hoverPoint={hoverPoint}
          setHoverPoint={setHoverPoint}
          hoverShape={renderShape(hoverPoint, selectedShape)}
          mouseDown={mouseDown}
          dragging={dragging}
          setDrag={setDrag}
          selectShape={selectShape}
          dropShape={dropShape}
        />

        <Controls
          // Controls for back, play, pause, and forward
          style={{
            opacity: drawerOpen ? 0 : 1,
            transition: "all 100ms ease",
            transitionDelay: !drawerOpen ? "250ms" : ""
          }}
          playing={playing}
          play={play}
          pause={pause}
          step={step}
          back={back}
          timeStep={timeStep}
          setTimeStep={setTimeStep}
        />

        <ContextMenu
          mouse={mouse}
          pause={pause}
          handleCloseMenu={handleCloseMenu}
          setGrid={setGrid}
        />
      </div>

      <WelcomeDialog
        // Welcome dialog with app summary
        open={welcomeOpen}
        setOpen={setWelcomeOpen}
      />
    </>
  );
}
