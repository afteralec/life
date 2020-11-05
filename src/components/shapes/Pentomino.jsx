import React from "react";
import ShapeGrid from "../ShapeGrid";

import generateGrid from "../../services/generateGrid";
import renderShape from "../../services/renderShape";
import splitId from "../../services/splitId";

export default function Pentomino({ selectShape, dropShape, setHoverPoint }) {
  const grid = generateGrid(3, 3, "pentomino");

  const center = { row: 1, col: 1 };

  for (const id in renderShape(center, "pentomino", "pentomino")) {
    const [row, col] = splitId(id);

    grid[row][col].active = true;
  }

  return (
    <ShapeGrid
      grid={grid}
      shape="pentomino"
      selectShape={selectShape}
      dropShape={dropShape}
      setHoverPoint={setHoverPoint}
    />
  );
}
