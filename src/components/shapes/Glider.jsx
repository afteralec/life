import React from "react";
import ShapeGrid from "../ShapeGrid";

import generateGrid from "../../services/generateGrid";
import renderShape from "../../services/renderShape";
import splitId from "../../services/splitId";

export default function Glider({ selectShape, dropShape, setHoverPoint }) {
  const grid = generateGrid(3, 3, "glider");

  const center = { row: 1, col: 1 };

  for (const id in renderShape(center, "glider", "glider")) {
    const [row, col] = splitId(id);

    grid[row][col].active = true;
  }

  return (
    <ShapeGrid
      grid={grid}
      shape="glider"
      selectShape={selectShape}
      dropShape={dropShape}
      setHoverPoint={setHoverPoint}
    />
  );
}
