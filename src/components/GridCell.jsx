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
  function cellStyles() {
    if (hovered) {
      return {
        backgroundColor: "#333",
        opacity: "0.5",
        transform: "scale(1)"
      };
    }

    if (active) {
      return {
        backgroundColor: "#333",
        animationName: "activeAnimation",
        animationDuration: "750ms",
        animationTimingFunction: "ease-in-out",
        animationDelay: 0,
        animationDirection: "alternate",
        animationIterationCount: 1
      };
    } else if (wasActive) {
      return {
        backgroundColor: "firebrick",
        transform: "scale(0)",
        animationName: "inactiveAnimation",
        animationDuration: "500ms",
        animationTimingFunction: "ease-in-out",
        animationDelay: 0,
        animationDirection: "alternate",
        animationIterationCount: 1,
        transitionProperty: "background-color transform",
        transitionDuration: "500ms"
      };
    } else {
      return {};
    }
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
          borderRadius: "100%",
          ...cellStyles()
        }}
      />
    </div>
  );
}
