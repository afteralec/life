import React from "react";
import ShapeGrid from "./ShapeGrid";
import AccordionDetails from "@material-ui/core/AccordionDetails";

import generateGrid from "../services/generateGrid";
import renderShape from "../services/renderShape";
import splitId from "../services/splitId";

export default function AccordionShape({
  rows,
  cols,
  center,
  name,
  label,
  setExpanded,
  selectShape,
  dropShape,
  setHoverPoint
}) {
  const grid = generateGrid(rows, cols, name);

  for (const id in renderShape(center, name, name)) {
    const [row, col] = splitId(id);

    grid[row][col].active = true;
  }

  return (
    <AccordionDetails
      style={{
        margin: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <ShapeGrid
        grid={grid}
        shape="pentomino"
        setExpanded={setExpanded}
        selectShape={selectShape}
        dropShape={dropShape}
        setHoverPoint={setHoverPoint}
      />
      <span
        style={{
          position: "absolute",
          bottom: "2.5vh",
          fontSize: "0.85rem",
          //transform: "translateY(-2.5vh)",
          margin: 0,
          padding: 0,
          textAlign: "center"
        }}
      >
        {label}
      </span>
    </AccordionDetails>
  );
}
