import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { AutoRotatingCarousel, Slide } from "material-auto-rotating-carousel";
import Grid from "./components/Grid";
import Controls from "./components/Controls";
import ShapesAccordion from "./components/ShapesAccordion";

import generateGrid from "./services/generateGrid";
import splitId from "./services/splitId";
import renderShape from "./services/renderShape";

import { welcomeTitle, welcomeSubtitle } from "./services/carouselText";

export default function App() {
  const [game, setGame] = useState(0); // 1 is playing, 0 is not playing
  const [grid, setGrid] = useState(generateGrid());
  const [timeStep, setTimeStep] = useState(1000);
  const [selectedShape, selectShape] = useState("");
  const [hoverPoint, setHoverPoint] = useState({});
  const [activeCount, setActiveCount] = useState(1);
  const [mouseDown, setMouseDown] = useState(false);
  const [mouse, setMouse] = useState({ x: null, y: null });
  const [carouselOpen, setCarouselOpen] = useState(true);

  function handleContextMenu(event) {
    event.preventDefault();
    setMouse({
      x: event.clientX - 2,
      y: event.clientY - 4
    });
  }

  function handleCloseMenu() {
    setMouse({ x: null, y: null });
  }

  function play() {
    setGame(setInterval(step, timeStep));
  }

  function pause() {
    clearInterval(game);
    setGame(0);
  }

  function clear() {
    pause();
    setGrid(generateGrid());
  }

  function step() {
    const newGrid = [...grid];

    for (const row of newGrid) {
      for (const cell of row) {
        cell.applyRules(grid);
      }
    }

    for (const row of newGrid) {
      for (const cell of row) {
        cell.play();
      }
    }

    setGrid(newGrid);
  }

  function back() {
    const newGrid = [...grid];

    for (const row of newGrid) {
      for (const cell of row) {
        cell.back();
      }
    }

    setGrid(newGrid);
  }

  function toggleActive(id) {
    const newGrid = [...grid],
      pos = splitId(id),
      cell = newGrid[pos[0]][pos[1]];

    cell.wasActive = cell.active;
    cell.active = !cell.active;

    setGrid(newGrid);
  }

  function seed(key) {
    setGrid((grid) => SEED[key](grid));
  }

  function dropShape(row, col) {
    for (const id in renderShape(hoverPoint, selectedShape)) {
      const [row, col] = splitId(id);

      grid[row][col].active = true;
    }

    setGrid(grid);
  }

  return (
    <>
      <CssBaseline />
      <div
        className="flex flex-col flex-center app-margin-top"
        onContextMenu={handleContextMenu}
        onMouseDown={() => {
          setMouseDown(true);
        }}
        onMouseUp={() => {
          setMouseDown(false);
        }}
      >
        <ShapesAccordion
          selectShape={selectShape}
          dropShape={dropShape}
          setHoverPoint={setHoverPoint}
        />
        <Grid
          grid={grid}
          toggleActive={toggleActive}
          hoverPoint={hoverPoint}
          setHoverPoint={setHoverPoint}
          hoverShape={renderShape(hoverPoint, selectedShape)}
          mouseDown={mouseDown}
        />
        <Controls
          style={{
            opacity: carouselOpen ? 0 : 1,
            transition: "all 1000ms ease-in-out"
          }}
          boardEmpty={activeCount === 0}
          playing={game && activeCount > 0}
          game={game}
          play={play}
          pause={pause}
          step={step}
          back={back}
          timeStep={timeStep}
          setTimeStep={setTimeStep}
        />
        <Menu
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
      </div>
      <AutoRotatingCarousel
        label="Let's Go!"
        open={carouselOpen}
        autoplay={false}
        onClose={() => setCarouselOpen(false)}
        onStart={() => setCarouselOpen(false)}
        style={{ position: "absolute" }}
      >
        <Slide
          media={<div>Media!</div>}
          mediaBackgroundStyle={{ backgroundColor: "firebrick" }}
          title={welcomeTitle}
          subtitle={welcomeSubtitle}
        />
        <Slide
          media={<div>Media!</div>}
          mediaBackgroundStyle={{ backgroundColor: "firebrick" }}
          title="Test title"
          subtitle="Test subtitle"
        />
      </AutoRotatingCarousel>
    </>
  );
}

const SEED = {
  random: (grid) => {
    const newGrid = [...grid];

    for (const row of newGrid) {
      for (const cell of row) {
        cell.active = Math.random() >= 0.7;
        cell.history = [cell.active];
      }
    }

    return newGrid;
  }
};
