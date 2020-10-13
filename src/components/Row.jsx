import React from "react";
import Cell from "./Cell";

export default function Row({ row, toggleActive }) {
  return (
    <div className="flex">
      {row.map((cell) => (
        <Cell key={cell.id} {...cell} toggleActive={toggleActive} />
      ))}
    </div>
  );
}
