import React from "react";
import GridCell from "./GridCell";

export default function Grid({
  grid,
  toggleActive,
  hoverPoint,
  setHoverPoint,
  hoverShape,
  mouseDown
}) {
  return (
    <div className="flex flex-col border">
      {grid.map((row, index) => (
        <div key={index} className="flex">
          {row.map((cell) => (
            <GridCell key={cell.id} cell={cell} />
          ))}
        </div>
      ))}
    </div>
  );
}
