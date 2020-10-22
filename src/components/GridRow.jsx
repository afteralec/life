import React from "react";
import GridCell from "./GridCell";

export default function Row({ row, toggleActive, mouseDown }) {
  return (
    <div className="flex">
      {row.map((cell) => (
        <GridCell
          key={cell.id}
          {...cell}
          toggleActive={toggleActive}
          mouseDown={mouseDown}
        />
      ))}
    </div>
  );
}
