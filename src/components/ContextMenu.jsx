import React from "react";

// App javaScript service file imports
import generateGrid from "../services/generateGrid";
import seeds from "../services/seeds";

// Material UI Component imports
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export default function ContextMenu({
  mouse,
  pause,
  handleCloseMenu,
  setGrid
}) {
  function clear() {
    // TODO: add logic to the grid to pause if the state is stable; can remove pause() then
    pause();
    setGrid(generateGrid());
  }

  function seed(key) {
    setGrid((grid) => seeds[key](grid));
  }

  return (
    <Menu
      // Context menu for when you right click
      keepMounted
      open={mouse.y !== null}
      onClose={handleCloseMenu}
      anchorReference="anchorPosition"
      anchorPosition={
        mouse.y !== null && mouse.x !== null
          ? { top: mouse.y, left: mouse.x }
          : undefined
      }
    >
      <MenuItem
        onClick={() => {
          clear();
          handleCloseMenu();
        }}
      >
        Clear
      </MenuItem>
      <MenuItem
        onClick={() => {
          seed("random");
          handleCloseMenu();
        }}
      >
        Random
      </MenuItem>
    </Menu>
  );
}
