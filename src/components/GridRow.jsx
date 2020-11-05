import React from "react";
import GridCell from "./GridCell";

export default function Row({
  row,
  toggleActive,
  hoverShape,
  hoverPoint,
  setHoverPoint,
  mouseDown
}) {
  return (
    <div className="flex">
      {row.map((cell) => (
        <GridCell
          key={cell.id}
          {...cell}
          toggleActive={toggleActive}
          hoverPoint={hoverPoint}
          setHoverPoint={setHoverPoint}
          hovered={!!hoverShape[cell.id]}
          mouseDown={mouseDown}
        />
      ))}
    </div>
  );
}
