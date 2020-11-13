import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import Grid from "./components/Grid";
import Controls from "./components/Controls";
import ShapesAccordion from "./components/ShapesAccordion";
import WelcomeDialog from "./components/WelcomeDialog";

import generateGrid from "./services/generateGrid";
import splitId from "./services/splitId";
import renderShape from "./services/renderShape";

export default function App() {
  const [game, setGame] = useState(0); // 1 is playing, 0 is not playing
  const [grid, setGrid] = useState(generateGrid());
  const [timeStep, setTimeStep] = useState(1000);
  const [selectedShape, selectShape] = useState("");
  const [hoverPoint, setHoverPoint] = useState({});
  const [mouseDown, setMouseDown] = useState(false);
  const [mouse, setMouse] = useState({ x: null, y: null });
  const [dragging, setDrag] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [welcomeOpen, setWelcomeOpen] = useState(true);

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
    setGame(setInterval(step, timeStep));
  }

  function pause() {
    clearInterval(game);
    setGame(0);
  }

  function clear() {
    pause();
    setGrid(generateGrid());
  }

  function step() {
    const newGrid = [...grid];

    for (const row of newGrid) {
      for (const cell of row) {
        cell.applyRules(grid);
      }
    }

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

  function seed(key) {
    setGrid((grid) => SEED[key](grid));
  }

  function dropShape(row, col) {
    for (const id in renderShape(hoverPoint, selectedShape)) {
      const [row, col] = splitId(id);

      grid[row][col].active = true;
    }

    setGrid(grid);
  }

  return (
    <>
      <CssBaseline
      // Baseline component to provide style reset from Material UI
      />
      <div
        style={{
          cursor: dragging ? "grabbing" : "auto"
        }}
        className="flex flex-col flex-center app-margin-top"
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
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          selectShape={selectShape}
          dropShape={dropShape}
          setHoverPoint={setHoverPoint}
          dragging={dragging}
          setDrag={setDrag}
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
          game={game}
          play={play}
          pause={pause}
          step={step}
          back={back}
          timeStep={timeStep}
          setTimeStep={setTimeStep}
        />
        <Menu
          // Context menu for when you right click
          keepMounted
          open={mouse.y !== null}
          onClose={handleCloseMenu}
          anchorReference="anchorPosition"
          anchorPosition={
            mouse.y !== null && mouse.x !== null
              ? { top: mouse.y, left: mouse.x }
              : undefined
          }
        >
          <MenuItem
            onClick={() => {
              clear();
              handleCloseMenu();
            }}
          >
            Clear
          </MenuItem>
          <MenuItem
            onClick={() => {
              seed("random");
              handleCloseMenu();
            }}
          >
            Random
          </MenuItem>
        </Menu>
      </div>
      <WelcomeDialog open={welcomeOpen} setOpen={setWelcomeOpen} />
    </>
  );
}

const SEED = {
  random: (grid) => {
    const newGrid = [...grid];

    for (const row of newGrid) {
      for (const cell of row) {
        cell.active = Math.random() >= 0.7;
        cell.history = [cell.active];
      }
    }

    return newGrid;
  }
};
