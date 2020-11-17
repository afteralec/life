import React, { useState } from "react";
import ShapeGrid from "./ShapeGrid";
import AccordionDetails from "@material-ui/core/AccordionDetails";

import generateGrid from "../services/generateGrid";
import { renderAccordionShape } from "../services/renderShape";
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
  setHoverPoint,
  dragging,
  setDrag,
  rule
}) {
  if (rows > 3) rows = 3;
  if (cols > 5) cols = 5;

  const [hover, setHover] = useState(false);
  const grid = generateGrid(rows, cols, name);

  for (const id in renderAccordionShape(center, name, name)) {
    const [row, col] = splitId(id);

    if (!grid[row]) continue;
    if (!grid[row][col]) continue;

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
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <ShapeGrid
          style={{
            transform: hover ? "scale(0.8) translateY(2vh)" : "scale(0.8)"
          }}
          grid={grid}
          shape={name}
          setExpanded={setExpanded}
          selectShape={selectShape}
          dropShape={dropShape}
          setHoverPoint={setHoverPoint}
          dragging={dragging}
          setDrag={setDrag}
        />
        <span
          style={{
            position: "absolute",
            bottom: "11vh",
            fontSize: "0.95rem",
            margin: 0,
            padding: 0,
            textAlign: "center",
            opacity: hover ? 1 : 0,
            transitionProperty: "opacity",
            transitionDuration: "250ms"
          }}
        >
          {label}
        </span>
      </AccordionDetails>
  );
}
