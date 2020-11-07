import React from "react";

export default function GridCell({
  id,
  row,
  col,
  active,
  wasActive,
  toggleActive,
  hoverPoint,
  setHoverPoint,
  hovered
}) {
  function activeClass() {
    if (active) {
      return "cell-active";
    } else if (wasActive) {
      return "cell-inactive";
    } else return "";
  }

  return (
    <div
      onDragOver={() => {
        if (row === hoverPoint.row && col === hoverPoint.col) return;
        setHoverPoint({ row, col });
      }}
      onClick={() => toggleActive(id)}
      className="flex flex-center border cell-size"
    >
      <div
        className={`inner-cell-size ${
          hovered ? "cell-hovered" : activeClass()
        }`}
      />
    </div>
  );
}
