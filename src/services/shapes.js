const shapes = {
  pentomino: {
    rows: 3,
    cols: 3,
    center: { row: 1, col: 1 },
    name: "pentomino",
    label: "R-Pentomino",
    coords: [
      [0, 0],
      [-1, 0],
      [0, -1],
      [1, 0],
      [-1, 1]
    ]
  },

  glider: {
    rows: 3,
    cols: 3,
    center: { row: 1, col: 1 },
    name: "glider",
    label: "Glider",
    coords: [
      [0, -1],
      [0, 1],
      [-1, 1],
      [1, 1],
      [1, 0],
      [1, 1]
    ]
  },

  diehard: {
    rows: 3,
    cols: 8,
    center: { row: 1, col: 3 },
    name: "diehard",
    label: "Diehard",
    coords: [
      [0, -2],
      [0, -3],
      [1, -2],
      [1, 2],
      [1, 3],
      [1, 4],
      [-1, 3]
    ]
  },

  acorn: {
    rows: 3,
    cols: 7,
    center: { row: 1, col: 3 },
    name: "acorn",
    label: "Acorn",
    coords: [
      [0, 0],
      [-1, -2],
      [1, -2],
      [1, -3],
      [1, 1],
      [1, 2],
      [1, 3]
    ]
  }
};

export default shapes;
