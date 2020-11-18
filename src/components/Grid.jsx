import React from "react";
import GridCell from "./GridCell";

export default function Grid({
  grid,
  toggleActive,
  hoverPoint,
  setHoverPoint,
  hoverShape,
  dragging,
  setDrag,
  selectShape,
  dropShape,
  tour,
  mouseDown
}) {
  return (
    <div
      style={{
        display: "flex",
        animation: tour ? "fadeInAndOut 4s linear" : "",
        animationIterationCount: tour ? "infinite" : "",
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
              dragging={dragging}
              setDrag={setDrag}
              selectShape={selectShape}
              dropShape={dropShape}
              mouseDown={mouseDown}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
