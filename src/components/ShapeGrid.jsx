import React from "react";
import ShapeGridRow from "./ShapeGridRow";

export default function ShapeGrid({
  grid,
  shape,
  setExpanded,
  selectShape,
  dropShape,
  setHoverPoint
}) {
  return (
    <div
      style={{ position: "relative" }}
      className="flex flex-col bg-transparent size-down"
      draggable
      onDragStart={() => {
        setExpanded(false);
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
