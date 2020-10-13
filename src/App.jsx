import React, { useState } from "react";
import Grid from "./components/Grid";

export default function App() {
  const [grid, setGrid] = useState(generateSquareGrid());

  function play() {
    const newGrid = [...grid];

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

    setGrid(newGrid);
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

    setGrid(newGrid);
  }

  return (
    <>
      <div className="flex flex-center">
        <button onClick={play}>Play</button>
      </div>
      <Grid grid={grid} toggleActive={toggleActive} />
    </>
  );
}

function generateSquareGrid(num = 1000) {
  const side = Math.ceil(Math.sqrt(num));

  const grid = [];

  for (let i = 0; i < side; i++) {
    const row = [];

    for (let ii = 0; ii < side; ii++) {
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
          [i + 1, ii + 1],
        ],
      });
    }

    grid.push(row);
  }

  return grid;
}
