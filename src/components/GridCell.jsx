import React, { useState } from "react";

export default function ({ cell }) {
  const [active, setActive] = useState(cell.active);

  function activeClass() {
    if (active) {
      return "cell-active";
    } else if (cell.wasActive) {
      return "cell-inactive";
    } else return "";
  }

  return (
    <div
      className="flex flex-center border cell-size"
      onClick={() => {
        setActive(true);
        cell.active = true;
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
