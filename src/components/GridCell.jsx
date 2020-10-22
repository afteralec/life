import React from "react";

export default function Cell({ id, active, toggleActive, mouseDown }) {
  return (
    <div className="flex flex-center border cell-size">
      <div
        onMouseEnter={() => {
          if (mouseDown && !active) toggleActive(id);
        }}
        onMouseDown={() => toggleActive(id)}
        className={`inner-cell-size ${
          active ? "cell-active" : "cell-inactive"
        }`}
      />
    </div>
  );
}
