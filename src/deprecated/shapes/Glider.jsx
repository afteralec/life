import React from "react";
import ShapeGrid from "../../components/ShapeGrid";
import AccordionDetails from "@material-ui/core/AccordionDetails";

import generateGrid from "../../services/generateGrid";
import renderShape from "../../services/renderShape";
import splitId from "../../services/splitId";

export default function Glider({
  setExpanded,
  selectShape,
  dropShape,
  setHoverPoint
}) {
  const grid = generateGrid(3, 3, "glider");

  const center = { row: 1, col: 1 };

  for (const id in renderShape(center, "glider", "glider")) {
    const [row, col] = splitId(id);

    grid[row][col].active = true;
  }

  return (
    <AccordionDetails
      style={{ margin: 0, display: "flex", flexDirection: "column" }}
    >
      <ShapeGrid
        grid={grid}
        shape="glider"
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
        Glider
      </span>
    </AccordionDetails>
  );
}
