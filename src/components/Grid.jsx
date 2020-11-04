import React from "react";
import GridRow from "./GridRow";

export default function Grid({ grid, toggleActive, hoverShape, mouseDown }) {
  return (
    <div className="flex flex-col border">
      {grid.map((row, index) => (
        <GridRow
          key={index}
          row={row}
          hoverShape={hoverShape}
          toggleActive={toggleActive}
          mouseDown={mouseDown}
        />
      ))}
    </div>
  );
}
