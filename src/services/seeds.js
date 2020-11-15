const seeds = {
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

export default seeds;
