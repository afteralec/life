import React from "react";
import ShapeGridRow from "./ShapeGridRow";

export default function ShapeGrid({
  grid,
  shape,
  setExpanded,
  selectShape,
  dropShape,
  setHoverPoint,
  style = {},
  dragging,
  setDrag
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgba(0, 0, 0, 0)",
        cursor: dragging ? "grabbing" : "grab",
        transitionProperty: "transform",
        transitionDuration: "250ms",
        ...style
      }}
      onMouseDown={() => {
        setDrag(true);
        setExpanded(false);
        selectShape(shape);
      }}
      onMouseUp={() => {
        setDrag(false);
        setExpanded(true);
        selectShape("");
      }}
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
