import React from "react";

export default function ShapeGridCell({ active }) {
  return (
    <div className="flex flex-center cell-size">
      <div className={`inner-cell-size ${active && "cell-active"}`} />
    </div>
  );
}
