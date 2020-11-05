import { v4 as uuid } from "uuid";
import Cell from "./Cell";
import makeId from "../services/makeId";

export default class Grid {
  cells = {};

  static all = {};

  constructor(rows = 20, cols = 50) {
    this.id = uuid();
    this.rows = rows;
    this.cols = cols;

    let i = rows;
    let ii = cols;

    while (i > 0) {
      while (ii > 0) {
        this.cells[makeId(i, ii)] = new Cell({
          row: i,
          col: ii,
          gridId: this.id
        });
      }
    }

    Grid.all[this.id] = this;
  }

  get virtual() {
    const grid = [];

    for (let row = 0; row < this.rows; row++) {
      grid[row] = this.cells.values
        .filter((cell) => cell.row === row)
        .map((cell) => cell.id);
    }

    return grid;
  }
}
