import React from "react";
import ShapeGrid from "../ShapeGrid";

import generateGrid from "../../services/generateGrid";
import renderShape from "../../services/renderShape";
import splitId from "../../services/splitId";

export default function Diehard({ selectShape, dropShape, setHoverPoint }) {
  const grid = generateGrid(3, 8, "diehard");

  const center = { row: 1, col: 3 };

  for (const id in renderShape(center, "diehard", "diehard")) {
    const [row, col] = splitId(id);

    grid[row][col].active = true;
  }

  return (
    <ShapeGrid
      grid={grid}
      shape="diehard"
      selectShape={selectShape}
      dropShape={dropShape}
      setHoverPoint={setHoverPoint}
    />
  );
}
