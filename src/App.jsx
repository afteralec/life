import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "./components/Grid";
import Navigation from "./components/Navigation";

export default function App() {
  const [game, setGame] = useState(0); // 1 is playing, 0 is not playing
  const [gridHistory, setGridHistory] = useState([generateGrid()]);
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
        console.log("cleared");
        clear();
        handleCloseMenu();
        break;
      default:
        handleCloseMenu();
    }
  }

  function handleCloseMenu() {
    setMouse({ X: null, Y: null });
  }

  function grid() {
    return gridHistory[0] || generateGrid();
  }

  function play() {
    setGame(1);

    // Rework this so it's a recursive setTimeout instead of setInterval
    //   To use async setGridHistory inside this function
    //   Or store the history in memory until "pause()" fires
    setTimeout(() => {
      step();
      clearInterval(game);
      setGame(setInterval(step, timeStep));
    }, timeStep / 2.5);
  }

  function pause() {
    clearInterval(game);
    setGame(0);
  }

  function clear() {
    pause();
    console.log("clear");
    setGridHistory([generateGrid()]);
    setActiveCount(0);
  }

  function step() {
    console.log(gridHistory);
    const newGrid = [...grid()];

    for (const row of newGrid) {
      for (const cell of row) {
        cell.willBeActive = setCell(cell);
      }
    }

    for (const row of newGrid) {
      for (const cell of row) {
        cell.active = !!cell.willBeActive;
        delete cell.willBeActive;
      }
    }

    setGridHistory((gridHistory) => [newGrid, ...gridHistory]);
  }

  function back() {
    setGridHistory((gridHistory) => [...gridHistory.slice(1)]);
  }

  function setCell({ active, neighbors }) {
    let i = 0;

    for (const pos of neighbors) {
      const row = grid()[pos[0]];

      if (row) {
        const neighbor = row[pos[1]];

        if (neighbor && neighbor.active) i++;
      }
    }

    return active ? i === 2 || i === 3 : i === 3;
  }

  function toggleActive(id) {
    const newGrid = [...grid()],
      pos = id.split(", "),
      cell = newGrid[pos[0]][pos[1]];

    cell.active = !cell.active;

    setGridHistory((gridHistory) => [newGrid, ...gridHistory.slice(1)]);
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
        grid={grid()}
        gridHistory={gridHistory}
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
