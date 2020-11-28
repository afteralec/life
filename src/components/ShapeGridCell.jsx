import React from "react";

// Component intended as a visually identical Cell to the main grid -
//   but without any of the functionality
export default function ShapeGridCell({ active }) {
  return (
    <div
      // Outer square cell wrapper div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "3.5vh",
        width: "3.5vh"
      }}
    >
      <div
        // Inner circle cell wrapper div
        style={{
          height: "3.25vh",
          width: "3.25vh",
          borderRadius: "100%",
          backgroundColor: active && "#333"
        }}
      />
    </div>
  );
}
