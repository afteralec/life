import Cell from "../models/Cell";

export default function generateGrid(rows = 20, cols = 50, key = "main") {
  const grid = [];

  for (let i = 0; i < rows; i++) {
    const row = [];

    for (let ii = 0; ii < cols; ii++) {
      row.push(
        new Cell({
          row: i,
          col: ii,
          key: key,
          neighbors: heyNeighbor(i, ii, rows - 1, cols - 1)
        })
      );
    }

    grid.push(row);
  }

  return grid;
}

function heyNeighbor(row, col, lastRow, lastCol) {
  let nw = [row - 1, col - 1],
    n = [row - 1, col],
    ne = [row - 1, col + 1],
    e = [row, col + 1],
    w = [row, col - 1],
    sw = [row + 1, col - 1],
    s = [row + 1, col],
    se = [row + 1, col + 1];

  // Handle top and bottom edge neighbors
  if (row === 0) {
    // Handle northwest and northeast corner cells
    switch (col) {
      case 0: // Northwest corner cell
        nw = [lastRow, lastCol];
        ne = [lastRow, col + 1];
        break;
      case lastCol: // Northeast corner cell
        nw = [lastRow, col - 1];
        ne = [lastRow, 0];
        break;
      default:
        // Everybody else
        nw = [lastRow, col - 1];
        ne = [lastRow, col + 1];
        break;
    }

    n = [lastRow, col];
  } else if (row === lastRow) {
    //Handle southwest and southeast corner cells
    switch (col) {
      case 0: // Southwest corner cell
        sw = [0, lastCol];
        se = [0, col + 1];
        break;
      case lastCol: // Southeast corner cell
        sw = [0, col - 1];
        se = [0, 0];
        break;
      default:
        // Everybody else
        sw = [0, col - 1];
        se = [0, col + 1];
        break;
    }

    s = [0, col];
  }

  // Handle left and right edge neighbors
  if (col === 0) {
    // Handle northwest and southwest corner cells
    switch (row) {
      case 0: // Northwest corner cell
        sw = [row + 1, lastCol];
        break;
      case lastRow: // Southwest corner cell
        nw = [row - 1, lastCol];
        break;
      default:
        // Everybody else
        sw = [row + 1, lastCol];
        nw = [row - 1, lastCol];
        break;
    }

    w = [row, lastCol];
  } else if (col === lastCol) {
    // Handle northeast and southeast corner cells
    switch (row) {
      case 0: // Northeast corner cell
        se = [row + 1, 0];
        break;
      case lastRow: // Southeast corner cell
        ne = [row - 1, 0];
        break;
      default:
        // Everybody else
        se = [row + 1, 0];
        ne = [row - 1, 0];
        break;
    }

    e = [row, 0];
  }

  return [nw, n, ne, e, w, sw, s, se];
}
