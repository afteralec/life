import React, { useState } from "react";

export default function ({
  id,
  row,
  col,
  active,
  hovered,
  toggleActive,
  hoverShape
}) {
  const activeClass = active ? "cell-active" : "cell-inactive";

  return (
    <div
      onDragOver={() => {
        hoverShape(row, col);
      }}
      // onMouseEnter={() => {
      //   if (mouseDown && !active) toggleActive(id);
      // }}
      onClick={() => toggleActive(id)}
      className="flex flex-center border cell-size"
    >
      <div
        // onMouseEnter={() => {
        //   if (mouseDown && !active) toggleActive(id);
        // }}
        className={`inner-cell-size ${hovered ? "cell-hovered" : activeClass}`}
      />
    </div>
  );
}
