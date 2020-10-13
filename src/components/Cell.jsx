import React from "react";

export default function Cell({ id, active, toggleActive }) {
  return (
    <div
      onClick={() => toggleActive(id)}
      className={active ? "cell active" : "cell inactive"}
    >
      X
    </div>
  );
}
