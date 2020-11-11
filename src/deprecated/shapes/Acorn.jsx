import React from "react";
import ShapeGrid from "../../components/ShapeGrid";
import AccordionDetails from "@material-ui/core/AccordionDetails";

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
    <AccordionDetails
      style={{ margin: 0, display: "flex", flexDirection: "column" }}
    >
      <ShapeGrid
        grid={grid}
        shape="acorn"
        setExpanded={setExpanded}
        selectShape={selectShape}
        dropShape={dropShape}
        setHoverPoint={setHoverPoint}
      />
      <span
        style={{
          fontSize: "0.9rem",
          transform: "translateY(-2.5vh)",
          margin: 0,
          padding: 0,
          textAlign: "center"
        }}
      >
        Acorn
      </span>
    </AccordionDetails>
  );
}
