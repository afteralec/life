import React from "react";

// Material UI imports
import useMediaQuery from "@material-ui/core/useMediaQuery";

// App Component imports
import GridCell from "./GridCell";

// App helper imports
import splitId from "../helpers/splitId";

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
  const mobile = useMediaQuery("(max-width: 1023px)"),
    portrait = useMediaQuery("(orientation: portrait)");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: mobile && portrait ? "row" : "column",
        border: "0.5px solid #333",

        // Animation for during the appropriate step of the tour
        animation: tour ? "fadeInAndOut 4s linear" : "",
        animationIterationCount: tour ? "infinite" : ""
      }}
      onTouchMove={(event) => {
        event.preventDefault();

        const touch = event.touches[0];

        const id = document.elementFromPoint(touch.clientX, touch.clientY).id;

        if (!id) return;

        if (mouseDown && !dragging) toggleActive(id);

        if (!dragging) return;

        const [row, col] = splitId(id);

        if (row === hoverPoint.row && col === hoverPoint.col) return;
        setHoverPoint({ row, col });
      }}
    >
      {grid.map((row, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: mobile && portrait ? "column" : "row"
          }}
        >
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
