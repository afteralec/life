// Object to provide different seeding for random initial states of the grid
const seeds = {
  // Function to return as random an initial state as possible
  random: (grid) => {
    const newGrid = [...grid];

    for (const row of newGrid) {
      for (const cell of row) {
        // The higher the comparison number is, the less likely a cell is to be active
        cell.active = Math.random() >= 0.7;

        // Update the historical data for the cell
        if (cell.active) cell.wasActive = true;
        cell.history = [cell.active];
      }
    }

    return newGrid;
  },

  // Used as a repeated pattern during the app tour to show cells going active and inactive
  tourExample: (grid) => {
    const newGrid = [...grid];

    for (const row of newGrid) {
      for (const cell of row) {
        // Set the comparison number very high to leave lots of inactive cells
        cell.active = Math.random() >= 0.95;

        // Update the historical data for the cell
        if (cell.active) cell.wasActive = true;
        cell.history = [cell.active];
      }
    }

    return newGrid;
  }
};

export default seeds;
