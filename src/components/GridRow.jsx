import React from "react";
import GridCell from "./GridCell";

export default function Row({
  row,
  toggleActive,
  hoverShape,
  setHoverShape,
  hoverPoint,
  setHoverPoint,
  mouseDown
}) {
  // function renderHovered({ row, col }) {
  //   return hoverShape.some((coords) => {
  //     return row === coords[0] && col === coords[1];
  //   });
  // }

  return (
    <div className="flex">
      {row.map((cell) => (
        <GridCell
          key={cell.id}
          {...cell}
          toggleActive={toggleActive}
          hoverShape={hoverShape}
          hoverPoint={hoverPoint}
          setHoverShape={setHoverShape}
          setHoverPoint={setHoverPoint}
          hovered={!!hoverShape[cell.id]}
          mouseDown={mouseDown}
        />
      ))}
    </div>
  );
}
