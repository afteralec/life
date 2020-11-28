import React from "react";

// App helper functin imports
import cellStyles from "../helpers/cellStyles";

// Component for each Cell Component of the main Grid
export default function GridCell({
  id,
  row,
  col,
  active,
  wasActive,
  toggleActive,
  hoverPoint,
  setHoverPoint,
  hovered,
  dragging,
  setDrag,
  selectShape,
  dropShape,
  mouseDown
}) {
  return (
    <div
      onMouseUp={() => {
        setDrag(false);
        selectShape("");
        dropShape();
        setHoverPoint({});
      }}
      onMouseEnter={() => {
        if (mouseDown && !dragging) toggleActive(id);

        if (!dragging) return;

        if (row === hoverPoint.row && col === hoverPoint.col) return;
        setHoverPoint({ row, col });
      }}
      onDrop={(event) => event.preventDefault()}
      onMouseDown={() => toggleActive(id)}
      style={{
        height: "3.5vh",
        width: "3.5vh",
        display: "flex",
        flexDirection: "column",
        border: "0.5px solid #333"
      }}
    >
      <div
        style={{
          height: "3.25vh",
          width: "3.25vh",
          borderRadius: "100%",
          ...cellStyles(hovered, active, wasActive)
        }}
      />
    </div>
  );
}
