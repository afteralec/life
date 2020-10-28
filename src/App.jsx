import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "./components/Grid";
import Navigation from "./components/Navigation";

export default function App() {
  const [game, setGame] = useState(0); // 1 is playing, 0 is not playing
  const [currentGrid, setCurrentGrid] = useState(generateGrid());
  const [timeStep, setTimeStep] = useState(1000);
  const [activeCount, setActiveCount] = useState(1);
  const [mouseDown, setMouseDown] = useState(false);
  const [mouse, setMouse] = useState({ X: null, Y: null });

  function handleContextMenu(event) {
    event.preventDefault();
    setMouse({
      X: event.clientX - 2,
      Y: event.clientY - 4
    });
  }

  function handleContextMenuClick(menuItemString) {
    switch (menuItemString) {
      case "clear":
        clear();
        handleCloseMenu();
        break;
      case "random":
        seed("random");
        handleCloseMenu();
        break;
      default:
        handleCloseMenu();
    }
  }

  function handleCloseMenu() {
    setMouse({ X: null, Y: null });
  }

  function play() {
    setGame(setInterval(step, timeStep));

    // setTimeout(step, timeStep);
    // step();
    // Rework this so it's a recursive setTimeout instead of setInterval
    //   To use async setGridHistory inside this function
    //   Or store the history in memory until "pause()" fires
    // setTimeout(() => {
    //   step();
    //   clearInterval(game);
    //   setGame(setInterval(step, timeStep));
    // }, timeStep / 2.5);
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
      pos = id.split(", "),
      cell = newGrid[pos[0]][pos[1]];

    cell.active = !cell.active;

    setCurrentGrid(newGrid);
  }

  function seed(key) {
    setCurrentGrid((currentGrid) => SEED[key](currentGrid));
  }

  return (
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
      <Grid
        grid={currentGrid}
        toggleActive={toggleActive}
        mouseDown={mouseDown}
      />
      <Navigation
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
        open={mouse.Y !== null}
        onClose={handleCloseMenu}
        anchorReference="anchorPosition"
        anchorPosition={
          mouse.Y !== null && mouse.X !== null
            ? { top: mouse.Y, left: mouse.X }
            : undefined
        }
      >
        <MenuItem onClick={() => handleContextMenuClick("clear")}>
          Clear
        </MenuItem>
        <MenuItem onClick={() => handleContextMenuClick("random")}>
          Random
        </MenuItem>
      </Menu>
    </div>
  );
}

function generateGrid(rows = 20, cells = 50) {
  const grid = [];

  for (let i = 0; i < rows; i++) {
    const row = [];

    for (let ii = 0; ii < cells; ii++) {
      row.push({
        id: `${i}, ${ii}`,
        active: false,
        history: [false],
        neighbors: [
          [i - 1, ii - 1],
          [i - 1, ii],
          [i - 1, ii + 1],
          [i, ii - 1],
          [i, ii + 1],
          [i + 1, ii - 1],
          [i + 1, ii],
          [i + 1, ii + 1]
        ]
      });
    }

    grid.push(row);
  }

  return grid;
}

const SEED = {
  random: (grid) => {
    const newGrid = [...grid];

    for (const row of newGrid) {
      for (const cell of row) {
        cell.active = Math.random() >= 0.5;
        cell.history = [cell.active];
      }
    }

    return newGrid;
  }
};
