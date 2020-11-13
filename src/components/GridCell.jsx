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
  hovered,
  dragging,
  setDrag,
  selectShape,
  dropShape
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
      onMouseUp={() => {
        setDrag(false);
        selectShape("");
        dropShape();
        setHoverPoint({});
      }}
      onMouseEnter={() => {
        if (!dragging) return;

        if (row === hoverPoint.row && col === hoverPoint.col) return;
        setHoverPoint({ row, col });
      }}
      onDrop={(event) => event.preventDefault()}
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
