import React from "react";
import Row from "./Row";

export default function Grid({ grid, toggleActive }) {
  return (
    <div className="flex flex-col">
      {grid.map((row, index) => (
        <Row key={index} row={row} toggleActive={toggleActive} />
      ))}
    </div>
  );
}
