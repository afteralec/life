const seeds = {
  random: (grid) => {
    const newGrid = [...grid];

    for (const row of newGrid) {
      for (const cell of row) {
        cell.active = Math.random() >= 0.7;
        if (cell.active) cell.wasActive = true;
        cell.history = [cell.active];
      }
    }

    return newGrid;
  },

  tourExample: (grid) => {
    const newGrid = [...grid];

    for (const row of newGrid) {
      for (const cell of row) {
        cell.active = Math.random() >= 0.95;
        if (cell.active) cell.wasActive = true;
        cell.history = [cell.active];
      }
    }

    return newGrid;
  }
};

export default seeds;
