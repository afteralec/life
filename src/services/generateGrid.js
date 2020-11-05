import makeId from "./makeId";
import Cell from "../models/Cell";

export default function generateGrid(rows = 20, cols = 50, key = "main") {
  const grid = [];

  for (let i = 0; i < rows; i++) {
    const row = [];

    for (let ii = 0; ii < cols; ii++) {
      row.push(new Cell(i, ii, key));
    }

    grid.push(row);
  }

  // Special handling to create a recursive grid

  // Sets the neighbors of the top row
  for (const cell of grid[0]) {
    const row = rows - 1;
    const col = cell.col;

    cell.neighbors[0] = [row, col - 1]; // Northwest
    cell.neighbors[1] = [row, col]; // North
    cell.neighbors[2] = [row, col + 1]; // Northeast

    if (col === 0) {
      // Northwest corner cell
      cell.neighbors[0] = [rows - 1, cols - 1]; // Northwest neighbor is southeast cell
    } else if (col === cols - 1) {
      // Northeast corner cell
      cell.neighbors[2] = [rows - 1, 0]; // Northeast neighbor is southwest cell
    }
  }

  // Sets the neighbors of the bottom row
  for (const cell of grid[rows - 1]) {
    const col = cell.col;

    cell.neighbors[5] = [0, col + 1]; // Southeast
    cell.neighbors[6] = [0, col]; // South
    cell.neighbors[7] = [0, col - 1]; // Southwest

    if (col === 0) {
      // Southwest corner cell
      cell.neighbors[5] = [0, cols - 1]; // Southwest neighbor is northeast cell
    } else if (col === cols - 1) {
      //Southeast corner cell
      cell.neighbors[7] = [0, 0]; // Southeast neighbor is northwest cell
    }
  }

  // Sets the left and right neighbors of the left and right columns
  for (const row of grid) {
    const west = row[0];
    const east = row[cols - 1];

    west.neighbors[3] = [west.row, cols - 1]; // West
    east.neighbors[4] = [east.row, 0]; // East
  }

  // Sets the corner neighbors of the left and right columns
  for (let i = 1; i < rows - 1; i++) {
    let cell;

    // Sets the corner neighbors of the left column
    cell = grid[i][0];
    cell.neighbors[0] = [cell.row - 1, cols - 1]; // Northwest neighbor
    cell.neighbors[5] = [cell.row + 1, cols - 1]; // Southwest neighbor

    // Sets the corner neighbors of the right column
    cell = grid[i][cols - 1];
    cell.neighbors[2] = [cell.row - 1, 0]; // Northeast neighbor
    cell.neighbors[7] = [cell.row + 1, 0]; // Southeast neighbor
  }

  // Sets the left and right neighbors respectively of the left and right columns
  // for (const row of grid) {
  //   const west = row[0];
  //   const east = row[cols - 1];

  //   if (west.row !== 0) west.neighbors[0] = [west.row - 1, cols - 1]; // Northwest
  //   west.neighbors[3] = [west.row, cols - 1]; // West
  //   if (west.row !== rows - 1) west.neighbors[5] = [west.row + 1, cols - 1]; // Southwest

  //   if (east.row !== 0) east.neighbors[2] = [east.row - 1, 0]; // Northeast
  //   east.neighbors[4] = [east.row, 0]; // East
  //   if (east.row !== rows - 1) east.neighbors[7] = [east.row + 1, 0]; // Southeast
  // }

  console.log(grid);
  return grid;
}
