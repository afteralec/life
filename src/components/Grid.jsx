import React from "react";
import GridRow from "./GridRow";

export default function Grid({
  grid,
  toggleActive,
  hoverPoint,
  setHoverPoint,
  hoverShape,
  mouseDown,
  dragging,
  setDrag,
  selectShape,
  dropShape
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: "0.5px solid #333"
      }}
    >
      {grid.map((row, index) => (
        <GridRow
          key={index}
          row={row}
          hoverShape={hoverShape}
          hoverPoint={hoverPoint}
          setHoverPoint={setHoverPoint}
          toggleActive={toggleActive}
          mouseDown={mouseDown}
          dragging={dragging}
          setDrag={setDrag}
          selectShape={selectShape}
          dropShape={dropShape}
        />
      ))}
    </div>
  );
}
