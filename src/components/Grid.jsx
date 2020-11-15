import React from "react";
import GridCell from "./GridCell";

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
        <div key={index} style={{ display: "flex" }}>
          {row.map((cell) => (
            <GridCell
              key={cell.id}
              {...cell}
              toggleActive={toggleActive}
              hoverPoint={hoverPoint}
              setHoverPoint={setHoverPoint}
              hovered={!!hoverShape[cell.id]}
              mouseDown={mouseDown}
              dragging={dragging}
              setDrag={setDrag}
              selectShape={selectShape}
              dropShape={dropShape}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
