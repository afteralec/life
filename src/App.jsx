import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "./components/Grid";
import Controls from "./components/Controls";
import ShapesAccordion from "./components/ShapesAccordion";

import shapes from "./services/shapes";

export default function App() {
  const [game, setGame] = useState(0); // 1 is playing, 0 is not playing
  const [currentGrid, setCurrentGrid] = useState(generateGrid());
  const [timeStep, setTimeStep] = useState(1000);
  const [selectedShape, selectShape] = useState("");
  const [hoverShape, setHoverShape] = useState([]);
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

  function handleCloseMenu() {
    setMouse({ X: null, Y: null });
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

  function dropShape(row, col) {
    setCurrentGrid(
      activateShape(currentGrid, row, col, shapes[selectedShape], false)
    );
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
        <ShapesAccordion selectShape={selectShape} />
        <Grid
          grid={currentGrid}
          toggleActive={toggleActive}
          hoverShape={hoverShape}
          setHoverShape={setHoverShape}
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
          open={mouse.Y !== null}
          onClose={handleCloseMenu}
          anchorReference="anchorPosition"
          anchorPosition={
            mouse.Y !== null && mouse.X !== null
              ? { top: mouse.Y, left: mouse.X }
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
          <MenuItem
            onClick={() => {
              setCurrentGrid(
                activateShape(currentGrid, 10, 25, shapes.pentomino)
              );
              handleCloseMenu();
            }}
          >
            Pentomino
          </MenuItem>
        </Menu>
      </div>
    </>
  );
}

function generateGrid(rows = 20, cols = 50) {
  const grid = [];

  for (let i = 0; i < rows; i++) {
    const row = [];

    for (let ii = 0; ii < cols; ii++) {
      row.push({
        row: i,
        col: ii,
        id: `${i}, ${ii}`,
        active: false,
        history: [false],
        neighbors: [
          [i - 1, ii - 1], // Northwest
          [i - 1, ii], // North
          [i - 1, ii + 1], // Northeast
          [i, ii - 1], // West
          [i, ii + 1], // East
          [i + 1, ii - 1], // Southwest
          [i + 1, ii], // South
          [i + 1, ii + 1] // Southeast
        ]
      });
    }

    grid.push(row);
  }

  // Special handling to create a recursive grid

  // Set the neighbors of the Northwest corner cell
  const nw = grid[0][0];
  nw.neighbors[0] = [rows - 1, cols - 1]; // Northwest
  nw.neighbors[1] = [rows - 1, 0]; // North
  nw.neighbors[2] = [rows - 1, 1]; // Northeast

  // Set the neighbors of the Northeast corner cell
  const ne = grid[0][cols - 1];
  ne.neighbors[0] = [rows - 1, cols - 2]; // Northwest
  ne.neighbors[1] = [rows - 1, cols - 1]; // North
  ne.neighbors[2] = [rows - 1, 0]; // Northeast

  // Set the neighbors of the Southwest corner cell
  const sw = grid[rows - 1][0];
  sw.neighbors[5] = [0, cols - 1]; // Southwest
  sw.neighbors[6] = [0, 0]; // South
  sw.neighbors[7] = [0, 1]; // Southeast

  // Set the neighbors of the Southeast corner cell
  const se = grid[rows - 1][cols - 1];
  se.neighbors[5] = [0, cols - 2]; // Southwest
  se.neighbors[6] = [0, cols - 1]; // South
  se.neighbors[7] = [0, 0]; // Southeast

  // Sets the top neighbor of the top row to the bottom cell of the same column
  for (const cell of grid[0]) {
    const row = rows - 1;
    const col = cell.col;

    // Skip if the cell is the Northwest or Northeast corner cell
    if (col === 0 || col === cols - 1) continue;

    cell.neighbors[0] = [row, col - 1]; // Northwest
    cell.neighbors[1] = [row, col]; // North
    cell.neighbors[2] = [row, col + 1]; // Northeast
  }

  // Sets the bottom neighbor of the bottom row to the top cell of the same column
  for (const cell of grid[rows - 1]) {
    const col = cell.col;

    // Skip if the cell is the Southwest or Southeast corner cell
    if (col === 0 || col === cols - 1) continue;

    cell.neighbors[5] = [0, col + 1]; // Southeast
    cell.neighbors[6] = [0, col]; // South
    cell.neighbors[7] = [0, col - 1]; // Southwest
  }

  // Sets the left and right neighbors respectively of the left and right columns
  for (const row of grid) {
    const west = row[0];
    const east = row[cols - 1];

    west.neighbors[0] = [west.row - 1, cols - 1]; // Northwest
    west.neighbors[3] = [west.row, cols - 1]; // West
    west.neighbors[5] = [west.row + 1, cols - 1]; // Southwest

    east.neighbors[2] = [east.row - 1, 0]; // Northeast
    east.neighbors[4] = [east.row, 0]; // East
    east.neighbors[7] = [east.row + 1, 0]; // Southeast
  }

  return grid;
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

function activateShape(grid, row, col, coordinates, onMouseOver = true) {
  onMouseOver && grid[row] && grid[row][col]
    ? (grid[row][col].hovered = true)
    : (grid[row][col].active = true);

  for (const pair of coordinates) {
    onMouseOver && grid[row + pair[0]] && grid[row + pair[0]][col + pair[1]]
      ? (grid[row + pair[0]][col + pair[1]].hovered = true)
      : (grid[row + pair[0]][col + pair[1]].active = true);
  }

  return grid;
}
