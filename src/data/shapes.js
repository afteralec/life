const shapes = {
  acorn: {
    accordion: {
      rows: 3,
      cols: 3,
      center: { row: 1, col: 1 },
      coords: [
        [1, -1],
        [1, 0],
        [1, 1]
      ]
    },
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
  },

  diehard: {
    accordion: {
      rows: 3,
      cols: 3,
      center: { row: 1, col: 1 },
      coords: [
        [-1, 0],
        [1, -1],
        [1, 0],
        [1, 1]
      ]
    },
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

  // engine: {
  //   rows: 5,
  //   cols: 5,
  //   center: { row: 2, col: 2 },
  //   name: "engine",
  //   label: "Engine",
  //   coords: [
  //     [-2, -2],
  //     [-1, -2],
  //     [-2, -1],
  //     [-2, 0],
  //     [2, -2],
  //     [1, -1],
  //     [2, 0],
  //     [1, 0],
  //     [0, 1],
  //     [-2, 2],
  //     [0, 2],
  //     [1, 2],
  //     [2, 2]
  //   ]
  // },

  glider: {
    accordion: {},
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

  gospersGliderGun: {
    accordion: {
      rows: 3,
      cols: 4,
      center: { row: 1, col: 2 },
      coords: [
        [0, -2],
        [0, 0],
        [-1, 0],
        [1, 0],
        [0, 1]
      ]
    },
    rows: 9,
    cols: 36,
    center: { row: 4, col: 17 },
    name: "gospersGliderGun",
    label: "Gosper's Glider Gun",
    coords: [
      // Center shape
      [0, 0],
      [-1, -1],
      [0, -1],
      [1, -1],
      [2, -2],
      [-2, -2],
      [0, -3],
      [-3, -4],
      [-3, -5],
      [3, -4],
      [3, -5],
      [-2, -6],
      [2, -6],
      [-1, -7],
      [0, -7],
      [1, -7],

      [-1, 3],
      [-2, 3],
      [-3, 3],
      [-1, 4],
      [-2, 4],
      [-3, 4],
      [0, 5],
      [-4, 5],
      [0, 7],
      [1, 7],
      [-4, 7],
      [-5, 7],

      [0, -15],
      [0, -16],
      [-1, -15],
      [-1, -16],

      [-2, 17],
      [-2, 18],
      [-3, 17],
      [-3, 18]
    ]
  },

  pentaDecathlon: {
    accordion: {},
    rows: 3,
    cols: 10,
    center: { row: 1, col: 4 },
    name: "pentaDecathlon",
    label: "Penta-decathlon",
    coords: [
      [0, 0],
      [0, -1],
      [0, -3],
      [0, -4],
      [0, 1],
      [0, 2],
      [0, 4],
      [0, 5],
      [-1, -2],
      [1, -2],
      [-1, 3],
      [1, 3]
    ]
  },

  pentomino: {
    accordion: {},
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

  spaceship: {
    accordion: {},
    rows: 4,
    cols: 5,
    center: { row: 2, col: 2 },
    name: "spaceship",
    label: "Spaceship",
    coords: [
      [0, -1],
      [0, -2],
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 1],
      [-1, 0],
      [-1, -1],
      [-1, -2],
      [-1, 1],
      [-2, 0],
      [-2, -1]
    ]
  }
};

export default shapes;
