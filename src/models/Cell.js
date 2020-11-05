import makeId from "../services/makeId";

export default class Cell {
  active = false;
  wasActive = false;
  willBeActive = false;
  history = [false];

  constructor(row, col, key) {
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
