import React from "react";
import GridRow from "./GridRow";

export default function Grid({
  grid,
  toggleActive,
  hoverPoint,
  setHoverPoint,
  renderHoverShape,
  mouseDown
}) {
  return (
    <div className="flex flex-col border">
      {grid.map((row, index) => (
        <GridRow
          key={index}
          row={row}
          hoverShape={renderHoverShape()}
          hoverPoint={hoverPoint}
          setHoverPoint={setHoverPoint}
          toggleActive={toggleActive}
          mouseDown={mouseDown}
        />
      ))}
    </div>
  );
}
