import React, { useState } from "react";
import ShapeGridRow from "./ShapeGridRow";

export default function ShapeGrid({
  grid,
  shape,
  setExpanded,
  selectShape,
  dropShape,
  setHoverPoint,
  style = {}
}) {
  const [dragging, setDrag] = useState(false);

  return (
    <div
      style={{
        cursor: dragging ? "grabbing" : "grab",
        transitionProperty: "transform",
        transitionDuration: "250ms",
        ...style
      }}
      className="flex flex-col bg-transparent"
      draggable
      onMouseDown={() => setDrag(true)}
      onMouseUp={() => setDrag(false)}
      onDragStart={() => {
        setDrag(true);
        setExpanded(false);
        selectShape(shape);
      }}
      onDragEnd={() => {
        setDrag(false);
        selectShape("");
        dropShape();
        setHoverPoint({});
      }}
    >
      {grid.map((row, index) => (
        <ShapeGridRow key={index} row={row} />
      ))}
    </div>
  );
}
