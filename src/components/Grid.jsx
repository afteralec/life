import React, { useState } from "react";
import GridRow from "./GridRow";
import shapes from "../services/shapes";

export default function Grid({
  grid,
  toggleActive,
  hoverShape,
  setHoverShape,
  mouseDown
}) {
  const [hoverPoint, setHoverPoint] = useState({});

  function renderHoverShape() {
    if (!hoverPoint.row) return false;

    const { row, col } = hoverPoint;
    const hoverShape = {};

    hoverShape[`${hoverPoint.row}, ${hoverPoint.col}`] = true;

    shapes.pentomino.forEach((coords) => {
      hoverShape[`${row + coords[0]}, ${col + coords[1]}`] = true;
    });

    return hoverShape;
  }

  return (
    <div className="flex flex-col border">
      {grid.map((row, index) => (
        <GridRow
          key={index}
          row={row}
          hoverShape={renderHoverShape()}
          hoverPoint={hoverPoint}
          setHoverPoint={setHoverPoint}
          setHoverShape={setHoverShape}
          toggleActive={toggleActive}
          mouseDown={mouseDown}
        />
      ))}
    </div>
  );
}
