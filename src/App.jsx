import React, { useState } from "react";
import Grid from "./components/Grid";
import Navigation from "./components/Navigation";

export default function App() {
  const [game, setGame] = useState(0);
  const [grid, setGrid] = useState(generateGrid());
  const [timeStep, setTimeStep] = useState(1000);
  const [activeCount, setActiveCount] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);

  function play() {
    setGame(1);
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
    setGrid(generateGrid());
    setActiveCount(0);
  }

  function step() {
    const newGrid = [...grid];

    for (const row of newGrid) {
      for (const cell of row) {
        cell.willBeActive = setCell(cell);
      }
    }

    let newActiveCount = 0;

    for (const row of newGrid) {
      for (const cell of row) {
        cell.active = !!cell.willBeActive;
        if (cell.active) newActiveCount++;
        delete cell.willBeActive;
      }
    }

    setGrid(newGrid);
    setActiveCount(newActiveCount);
    if (newActiveCount === 0) pause();
  }

  function setCell({ active, neighbors }) {
    let i = 0;

    for (const pos of neighbors) {
      const row = grid[pos[0]];

      if (row) {
        const neighbor = row[pos[1]];

        if (neighbor && neighbor.active) i++;
      }
    }

    return active ? i === 2 || i === 3 : i === 3;
  }

  function toggleActive(id) {
    const newGrid = [...grid],
      pos = id.split(", "),
      cell = newGrid[pos[0]][pos[1]];

    cell.active = !cell.active;

    if (cell.active) {
      setActiveCount((activeCount) => activeCount + 1);
    } else {
      setActiveCount((activeCount) => activeCount - 1);
    }

    setGrid(newGrid);
  }

  return (
    <div
      className="flex flex-col flex-center app-margin-top"
      onMouseDown={() => {
        setMouseDown(true);
      }}
      onMouseUp={() => {
        setMouseDown(false);
      }}
    >
      <Grid grid={grid} toggleActive={toggleActive} mouseDown={mouseDown} />
      <Navigation
        boardEmpty={activeCount === 0}
        playing={game && activeCount > 0}
        game={game}
        play={play}
        pause={pause}
        step={step}
        clear={clear}
        timeStep={timeStep}
        setTimeStep={setTimeStep}
      />
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
