import React from "react";
import GridRow from "./GridRow";

export default function Grid({ grid, toggleActive, mouseDown }) {
  return (
    <div className="flex flex-col border">
      {grid.map((row, index) => (
        <GridRow
          key={index}
          row={row}
          toggleActive={toggleActive}
          mouseDown={mouseDown}
        />
      ))}
    </div>
  );
}
