import React from "react";

// App Component imports
import ShapeGridCell from "./ShapeGridCell";

// Component to render a smaller grid for a Shape, the prebuilt states that go in the Shapes drawer
export default function ShapeGrid({
  grid,
  shape,
  setExpanded,
  selectShape,
  style = {},
  dragging,
  setDrag,
  tour,
  setTourStep
}) {
  return (
    <div
      // Wrapper div for the entire shape
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgba(0, 0, 0, 0)",
        cursor: dragging ? "grabbing" : "grab",
        transitionProperty: "transform",
        transitionDuration: "250ms",
        ...style
      }}
      // Using mouseDown for custom drag and drop emulation
      onMouseDown={() => {
        // Set dragging to true
        setDrag(true);

        // Close the drawer
        setExpanded(false);

        // Set the selectedshape to this shape object
        selectShape(shape);

        // If the tour is active the Shapes; push the tour forward one step on mouse down
        if (tour) setTourStep((tourStep) => tourStep + 1);
      }}
      // onTouchStart={() => {
      //   // Set dragging to true
      //   setDrag(true);

      //   // Close the drawer
      //   setExpanded(false);

      //   // Set the selectedshape to this shape object
      //   selectShape(shape);

      //   // If the tour is active the Shapes; push the tour forward one step on mouse down
      //   if (tour) setTourStep((tourStep) => tourStep + 1);
      // }}
      // MouseUp here to cancel the custom drag and drop emulation
      onMouseUp={() => {
        // Set dragging to false
        setDrag(false);

        // Open the drawer if it isn't open
        setExpanded(true);

        // Set the selected shape back to default
        selectShape("");
      }}
      // onTouchEnd={() => {
      //   // Set dragging to false
      //   setDrag(false);

      //   // Open the drawer if it isn't open
      //   setExpanded(true);

      //   // Set the selected shape back to default
      //   selectShape("");
      // }}
    >
      {grid.map((row, index) => (
        <div key={index} style={{ display: "flex" }}>
          {row.map((cell) => (
            // For each Cell object of the truncated grid, render a ShapeGridCell Component
            <ShapeGridCell key={cell.id} {...cell} />
          ))}
        </div>
      ))}
    </div>
  );
}
