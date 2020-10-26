import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import GridRow from "./GridRow";

export default function Grid({ gridHistory, toggleActive, mouseDown }) {
  return (
    <div className="flex flex-col border">
      {gridHistory[0].map((row, index) => (
        <GridRow
          key={index}
          row={row}
          toggleActive={toggleActive}
          mouseDown={mouseDown}
        />
      ))}
    </div>
  );
}
