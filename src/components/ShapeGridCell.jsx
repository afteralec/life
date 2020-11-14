import React from "react";

export default function ShapeGridCell({ active }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "3.5vh",
        width: "3.5vh"
      }}
    >
      <div
        style={{
          height: "3.25vh",
          width: "3.25vh",
          borderRadius: "100%"
        }}
        className={`${active && "cell-active"}`}
      />
    </div>
  );
}
