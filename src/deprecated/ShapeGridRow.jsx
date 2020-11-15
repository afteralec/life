import React from "react";
import ShapeGridCell from "../components/ShapeGridCell";

export default function ShapeRow({ row }) {
  return (
    <div style={{ display: "flex" }}>
      {row.map((cell) => (
        <ShapeGridCell key={cell.id} {...cell} />
      ))}
    </div>
  );
}
