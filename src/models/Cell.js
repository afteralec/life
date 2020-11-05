import { v4 as uuid } from "uuid";
import makeId from "../services/makeId";

import Grid from "./Grid";

export default class Cell {
  active = false;
  wasActive = false;
  willBeActive = false;
  history = [false];

  constructor({ row, col, gridId }) {
    this.id = uuid();
    this.row = row;
    this.col = col;
    this.gridId = gridId;
    this.grid = Grid.all[gridId];
  }

  heyNeighbor() {
    const grid = this.grid.virtual,
      row = this.row,
      col = this.col;

    this.neighbors = {
      nw: grid[row - 1][col - 1],
      n: grid[row - 1][col],
      ne: grid[row - 1][col + 1],
      e: grid[row][col + 1],
      w: grid[row][col - 1],
      sw: grid[row + 1][col - 1],
      s: grid[row + 1][col],
      se: grid[row + 1][col + 1]
    };
  }

  applyRules() {
    let i = 0;

    for (const neighbor of this.neighbors.values) {
      if (this.grid.cells[neighbor].active) i++;
    }

    this.wasActive = this.active;
    this.willBeActive = this.active ? i === 2 || i === 3 : i === 3;
  }

  play() {
    this.history.unshift(this.active);
    this.active = !!this.willBeActive;
    this.willBeActive = false;
  }

  back() {
    this.active = this.history.shift() || false;
    this.wasActive = this.history[0] || false;
    this.willBeActive = false;
  }
}

export class oldCell {
  active = false;
  wasActive = false;
  willBeActive = false;
  history = [false];

  constructor(row, col, key = "main") {
    this.row = row;
    this.col = col;
    this.id = makeId(key, row, col);
    this.neighbors = [
      [row - 1, col - 1], // Northwest
      [row - 1, col], // North
      [row - 1, col + 1], // Northeast
      [row, col - 1], // West
      [row, col + 1], // East
      [row + 1, col - 1], // Southwest
      [row + 1, col], // South
      [row + 1, col + 1] // Southeast
    ];
  }

  toggleActive() {
    this.active = !this.active;
  }

  applyRules(grid) {
    let i = 0;

    for (const coords of this.neighbors) {
      const row = grid[coords[0]];

      if (row) {
        const neighbor = row[coords[1]];

        if (neighbor && neighbor.active) i++;
      }
    }

    this.wasActive = this.active;
    this.willBeActive = this.active ? i === 2 || i === 3 : i === 3;
  }

  play() {
    this.history.unshift(this.active);
    this.active = !!this.willBeActive;
    this.willBeActive = false;
  }

  back() {
    this.active = this.history.shift() || false;
    this.wasActive = this.history[0] || false;
    this.willBeActive = false;
  }
}
