import makeId from "./makeId";

export default function generateGrid(rows = 20, cols = 50, key = "main") {
  const grid = [];

  for (let i = 0; i < rows; i++) {
    const row = [];

    for (let ii = 0; ii < cols; ii++) {
      row.push({
        row: i,
        col: ii,
        id: makeId(key, i, ii),
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
