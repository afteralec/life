import React from "react";
import ShapeGrid from "../ShapeGrid";

import generateGrid from "../../services/generateGrid";
import renderShape from "../../services/renderShape";
import splitId from "../../services/splitId";

export default function Acorn({
  setExpanded,
  selectShape,
  dropShape,
  setHoverPoint
}) {
  const grid = generateGrid(3, 7, "acorn");

  const center = { row: 1, col: 3 };

  for (const id in renderShape(center, "acorn", "acorn")) {
    const [row, col] = splitId(id);

    grid[row][col].active = true;
  }

  return (
    <ShapeGrid
      grid={grid}
      shape="acorn"
      setExpanded={setExpanded}
      selectShape={selectShape}
      dropShape={dropShape}
      setHoverPoint={setHoverPoint}
    />
  );
}
