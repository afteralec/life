import React from "react";
import ShapeGrid from "../../components/ShapeGrid";
import AccordionDetails from "@material-ui/core/AccordionDetails";

import generateGrid from "../../services/generateGrid";
import renderShape from "../../services/renderShape";
import splitId from "../../services/splitId";

export default function Pentomino({
  setExpanded,
  selectShape,
  dropShape,
  setHoverPoint
}) {
  const grid = generateGrid(3, 3, "pentomino");

  const center = { row: 1, col: 1 };

  for (const id in renderShape(center, "pentomino", "pentomino")) {
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
          transform: "translateY(-2.5vh)",
          margin: 0,
          padding: 0,
          textAlign: "center"
        }}
      >
        R-Pentomino
      </span>
    </AccordionDetails>
  );
}
