import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "./components/Grid";
import Controls from "./components/Controls";
import ShapesAccordion from "./components/ShapesAccordion";

import generateGrid from "./services/generateGrid";
import makeId from "./services/makeId";
import splitId from "./services/splitId";
import shapes from "./services/shapes";
import renderShape from "./services/renderShape";

export default function App() {
  const [game, setGame] = useState(0); // 1 is playing, 0 is not playing
  const [currentGrid, setCurrentGrid] = useState(generateGrid());
  const [timeStep, setTimeStep] = useState(1000);
  const [selectedShape, selectShape] = useState("");
  const [hoverPoint, setHoverPoint] = useState({});
  const [activeCount, setActiveCount] = useState(1);
  const [mouseDown, setMouseDown] = useState(false);
  const [mouse, setMouse] = useState({ x: null, y: null });

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
    setCurrentGrid(generateGrid());
  }

  function step() {
    const newGrid = [...currentGrid];

    for (const row of newGrid) {
      for (const cell of row) {
        cell.wasActive = cell.active;
        cell.willBeActive = applyRules(cell);
      }
    }

    for (const row of newGrid) {
      for (const cell of row) {
        cell.history.unshift(cell.active);
        cell.active = !!cell.willBeActive;
        delete cell.willBeActive;
      }
    }

    setCurrentGrid(newGrid);
  }

  function back() {
    const newGrid = [...currentGrid];

    for (const row of newGrid) {
      for (const cell of row) {
        cell.active = cell.history.shift() || false;
        cell.wasActive = cell.history[0] || false;
        delete cell.willBeActive;
      }
    }

    setCurrentGrid(newGrid);
  }

  function applyRules({ active, neighbors }) {
    let i = 0;

    for (const pos of neighbors) {
      const row = currentGrid[pos[0]];

      if (row) {
        const neighbor = row[pos[1]];

        if (neighbor && neighbor.active) i++;
      }
    }

    return active ? i === 2 || i === 3 : i === 3;
  }

  function toggleActive(id) {
    const newGrid = [...currentGrid],
      pos = splitId(id),
      cell = newGrid[pos[0]][pos[1]];

    cell.active = !cell.active;

    setCurrentGrid(newGrid);
  }

  function seed(key) {
    setCurrentGrid((currentGrid) => SEED[key](currentGrid));
  }

  function dropShape(row, col) {
    for (const id in renderShape(hoverPoint, selectedShape)) {
      const [row, col] = splitId(id);

      currentGrid[row][col].active = true;
    }

    setCurrentGrid(currentGrid);
  }

  function renderHoverShape() {
    return renderShape(hoverPoint, selectedShape);
  }

  return (
    <>
      <div
        className="flex flex-col flex-center app-margin-top"
        onContextMenu={handleContextMenu}
        onMouseDown={() => {
          setMouseDown(true);
        }}
        onMouseUp={() => {
          setMouseDown(false);
        }}
      >
        <ShapesAccordion
          selectShape={selectShape}
          dropShape={dropShape}
          setHoverPoint={setHoverPoint}
        />
        <Grid
          grid={currentGrid}
          toggleActive={toggleActive}
          hoverPoint={hoverPoint}
          setHoverPoint={setHoverPoint}
          hoverShape={renderShape(hoverPoint, selectedShape)}
          mouseDown={mouseDown}
        />
        <Controls
          boardEmpty={activeCount === 0}
          playing={game && activeCount > 0}
          game={game}
          play={play}
          pause={pause}
          step={step}
          back={back}
          timeStep={timeStep}
          setTimeStep={setTimeStep}
        />
        <Menu
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
