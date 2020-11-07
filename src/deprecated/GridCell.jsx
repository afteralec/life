import React from "react";

export default function GridCell({ cell, activateCell }) {
  function activeClass() {
    if (cell.active) {
      return "cell-active";
    } else if (cell.wasActive) {
      return "cell-inactive";
    } else return "";
  }

  const hovered = false; // Take this out later

  return (
    <div
      className="flex flex-center border cell-size"
      onClick={() => {
        activateCell(cell.id);
      }}
    >
      <div
        className={`inner-cell-size ${
          hovered ? "cell-hovered" : activeClass()
        }`}
      />
    </div>
  );
}
