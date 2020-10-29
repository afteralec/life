import React from "react";

export default function Cell({ id, active, toggleActive, mouseDown }) {
  return (
    <div
      onMouseEnter={() => {
        if (mouseDown && !active) toggleActive(id);
      }}
      onClick={() => toggleActive(id)}
      className="flex flex-center border cell-size"
    >
      <div
        onMouseEnter={() => {
          if (mouseDown && !active) toggleActive(id);
        }}
        className={`inner-cell-size ${
          active ? "cell-active" : "cell-inactive"
        }`}
      />
    </div>
  );
}
