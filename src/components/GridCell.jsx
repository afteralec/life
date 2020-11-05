import React from "react";
import shapes from "../services/shapes";

export default function ({
  id,
  row,
  col,
  active,
  toggleActive,
  hoverShape,
  setHoverShape,
  hoverPoint,
  setHoverPoint,
  hovered
}) {
  const activeClass = active ? "cell-active" : "cell-inactive";

  return (
    <div
      onDragOver={() => {
        if (row === hoverPoint.row && col === hoverPoint.col) return;
        console.log(hoverPoint);
        setHoverPoint({ row, col });
      }}
      // onMouseEnter={() => {
      //   if (mouseDown && !active) toggleActive(id);
      // }}

      onClick={() => toggleActive(id)}
      className="flex flex-center border cell-size"
    >
      <div
        className={`inner-cell-size ${hovered ? "cell-hovered" : activeClass}`}
      />
    </div>
  );
}
