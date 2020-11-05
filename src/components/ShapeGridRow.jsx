import React from "react";
import ShapeGridCell from "./ShapeGridCell";

export default function ShapeRow({ row }) {
  return (
    <div className="flex">
      {row.map((cell) => (
        <ShapeGridCell key={cell.id} {...cell} />
      ))}
    </div>
  );
}
