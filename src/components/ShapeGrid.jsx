import React from "react";
import ShapeGridRow from "./ShapeGridRow";

export default function ShapeGrid({
  grid,
  shape,
  selectShape,
  dropShape,
  setHoverPoint
}) {
  return (
    <div
      className="flex flex-col bg-transparent"
      draggable
      onDragStart={() => {
        selectShape(shape);
      }}
      onDragEnd={() => {
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
