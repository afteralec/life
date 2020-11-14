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
          borderRadius: "100%"
        }}
        className={`${hovered ? "cell-hovered" : activeClass()}`}
      />
    </div>
  );
}
