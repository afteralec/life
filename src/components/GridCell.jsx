import React from "react";

// Material UI imports
import useMediaQuery from "@material-ui/core/useMediaQuery";

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
  const mobile = useMediaQuery("(max-width: 1023px)");

  const cellSize = mobile ? "24px" : "3.5vh",
    innerCellSize = mobile ? "23px" : "3.25vh";

  return (
    <div
      id={id}
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
      //onDrop={(event) => event.preventDefault()}
      onMouseDown={() => toggleActive(id)}
      style={{
        height: cellSize,
        width: cellSize,
        display: "flex",
        flexDirection: "column",
        border: "0.5px solid #333"
      }}
    >
      <div
        style={{
          height: innerCellSize,
          width: innerCellSize,
          borderRadius: "100%",
          ...cellStyles(hovered, active, wasActive)
        }}
      />
    </div>
  );
}
