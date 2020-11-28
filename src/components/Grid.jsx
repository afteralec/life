import React from "react";

// App Component imports
import GridCell from "./GridCell";

// Component to render the main Grid
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
        flexDirection: "column",
        border: "0.5px solid #333",

        // Animation for during the appropriate step of the tour
        animation: tour ? "fadeInAndOut 4s linear" : "",
        animationIterationCount: tour ? "infinite" : ""
      }}
    >
      {grid.map((row, index) => (
        <div key={index} style={{ display: "flex" }}>
          {row.map((cell) => (
            <GridCell
              // Render a Cell component for each Cell object in the grid
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
