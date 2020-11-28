import makeId from "../helpers/makeId";

export default class Cell {
  // Properties every cell has
  active = false;
  wasActive = false;
  willBeActive = false;
  history = [false];

  // Cell constructor for each Cell instance
  constructor({ row, col, key, neighbors }) {
    this.row = row;
    this.col = col;
    this.id = makeId(key, row, col);
    this.neighbors = neighbors;
  }

  // First iteration through the grid to apply the rules of the Game to each cell
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

  // Function to have each cell instance play the game on itself after applying the rules
  play() {
    this.history.unshift(this.active);
    this.active = !!this.willBeActive;
    this.willBeActive = false;
  }

  // Function to have each cell instance move one step backwards in history
  back() {
    this.active = this.history.shift() || false;
    this.wasActive = this.history[0] || false;
    this.willBeActive = false;
  }
}
