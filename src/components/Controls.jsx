import React, { useState, useEffect } from "react";

// Material UI imports
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
// import Button from "@material-ui/core/Button";
// import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Fab from "@material-ui/core/Fab";
import MenuIcon from "@material-ui/icons/Menu";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import PauseRoundedIcon from "@material-ui/icons/PauseRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import CasinoRoundedIcon from "@material-ui/icons/Casino";

// App data imports
import seeds from "../data/seeds";

// App helper imports
import renderSpeed from "../helpers/renderSpeed";

// App script imports
import generateGrid from "../scripts/generateGrid";

const useStyles = makeStyles(() => ({
  appBar: {
    top: "auto",
    bottom: 0
  },

  grow: {
    flexGrow: 1
  },

  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto"
  }
}));

// Component for all the controls for the game
export default function Controls({
  style,
  playing,
  pause,
  play,
  clear,
  step,
  back,
  setTimeStep,
  tour,
  setTourStep,
  setGrid,
  setDrawerOpen
}) {
  const [sliderValue, setSliderValue] = useState(50),
    [playOnSliderMouseUp, setPlayOnSliderMouseUp] = useState(false);

  const classes = useStyles();

  // Effect to manage resuming the game after changing the slider speed
  useEffect(() => {
    if (playOnSliderMouseUp) {
      play();
      setPlayOnSliderMouseUp(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play]);

  // Function to manage clicking the Play button
  function handlePlay() {
    // If the tour is on the play step, push the tour forward when Play is pressed
    if (tour.play) {
      setTourStep((tourStep) => tourStep + 1);
      clear();
      return;
    }

    play();
  }

  // Function called when the slider value changes
  function sliderChange(event, value) {
    event.preventDefault();

    setSliderValue(value);

    // When the slider is changed, pause the game
    pause();

    // If the game is being played and the slider changes,
    //  set playOnSliderMouseUp to true
    if (playing) setPlayOnSliderMouseUp(true);
  }

  function updateTimeStep() {
    setTimeStep(1350 - sliderValue * 10);
    if (tour.slider) setTourStep((tourStep) => tourStep + 1);
  }

  // Adjust the control bar to mobile
  const hideSpeedTypography = useMediaQuery("(max-width: 799px)"),
    hideSpeedBar = useMediaQuery("(max-width: 450px)");

  return (
    <>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <IconButton
            onClick={() => {
              setDrawerOpen(true);
            }}
            edge="start"
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Fab
            color="secondary"
            aria-label="play and pause"
            className={classes.fabButton}
            onClick={() => {
              playing ? pause() : handlePlay();
            }}
          >
            {playing ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />}
          </Fab>
          <div className={classes.grow} />
          {!hideSpeedTypography && (
            <>
              <Typography
                style={{
                  paddingLeft: "1rem",
                  paddingRight: "0.5rem",
                  display: "inline"
                }}
              >
                Speed:{" "}
              </Typography>
              <Typography
                style={{
                  paddingLeft: "0.5rem",
                  paddingRight: "1rem",
                  display: "inline"
                }}
              >
                <strong>{renderSpeed(sliderValue)}</strong>
              </Typography>
            </>
          )}

          {!hideSpeedBar && (
            <Slider
              // Speed control slider
              style={{ width: "25%" }}
              color="secondary"
              value={sliderValue}
              onChange={sliderChange}
              onMouseDown={() => pause()}
              onMouseUp={updateTimeStep}
              onMouseLeave={updateTimeStep}
              aria-labelledby="continuous-slider"
            />
          )}
          <IconButton
            onClick={() => {
              clear();
            }}
            color="inherit"
          >
            <CloseRoundedIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              const newGrid = generateGrid();
              setGrid(seeds.random(newGrid));
            }}
            edge="end"
            color="inherit"
          >
            <CasinoRoundedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );

  // return (
  //   <div
  //     // Top-level wrapper div for the entire control unit
  //     style={{
  //       width: "100%",
  //       ...style
  //     }}
  //   >
  //     <div
  //       // Wrapper div for the majority of control buttons
  //       style={{
  //         display: "flex",
  //         position: "absolute",
  //         bottom: "7vh",
  //         left: "14vh",
  //         width: "85%"
  //       }}
  //     >
  //       <Button
  //         // Back button
  //         disabled={!!playing}
  //         onClick={back}
  //         color="primary"
  //       >
  //         Back
  //       </Button>

  //       <span
  //         // Wrapper to fade the Play/Pause buttons in and out on the appropriate tour step
  //         style={{
  //           animation: tour.play ? "fadeInAndOut 4s linear" : "",
  //           animationIterationCount: tour.play ? "infinite" : ""
  //         }}
  //       >
  //         <ButtonGroup
  //           // Button Group for Play and Pause buttons
  //           variant="contained"
  //           color="primary"
  //           aria-label="contained primary button group"
  //         >
  //           <Button
  //             // Play button
  //             variant="contained"
  //             disabled={!!playing}
  //             onClick={handlePlay}
  //             color="primary"
  //           >
  //             <PlayArrowRoundedIcon />
  //             Play
  //           </Button>
  //           <Button
  //             // Pause button
  //             variant="contained"
  //             disabled={!playing}
  //             onClick={pause}
  //             color="primary"
  //           >
  //             <PauseRoundedIcon />
  //             Pause
  //           </Button>
  //         </ButtonGroup>
  //       </span>

  //       <Button
  //         // Forward button
  //         disabled={!!playing}
  //         onClick={step}
  //         color="primary"
  //       >
  //         Forward
  //       </Button>

  //       <div
  //         // Wrapper div for Clear and Random buttons
  //         style={{
  //           marginLeft: "13rem"
  //         }}
  //       >
  //         <span
  //           // Wrapper for the Clear button to highlight during the appropriate tour step
  //           style={{
  //             animation: tour.clear ? "fadeInAndOut 4s linear" : "",
  //             animationIterationCount: tour.clear ? "infinite" : ""
  //           }}
  //         >
  //           <Button
  //             // Clear button
  //             onClick={() => {
  //               clear();

  //               // If the tour is on the Clear step, push the tour forward one step
  //               if (tour.clear) setTourStep((tourStep) => tourStep + 1);
  //             }}
  //             color="primary"
  //           >
  //             <CloseRoundedIcon />
  //             Clear
  //           </Button>
  //         </span>
  //         <Button
  //           // Random button
  //           onClick={() => {
  //             const newGrid = generateGrid();
  //             setGrid(seeds.random(newGrid));
  //           }}
  //           color="primary"
  //         >
  //           <CasinoRoundedIcon />
  //           Random
  //         </Button>
  //       </div>
  //     </div>

  //     <div
  //       // Wrapper div for the speed slider
  //       style={{
  //         position: "absolute",
  //         bottom: "5vh",
  //         right: "14vh",
  //         width: "15%"
  //       }}
  //     >
  //       <Typography style={{ display: "inline" }}>Speed: </Typography>
  //       <Typography
  //         style={{
  //           display: "inline"
  //         }}
  //       >
  //         <strong>{renderSpeed(sliderValue)}</strong>
  //       </Typography>
  //       <Slider
  //         // Speed control slider
  //         color="primary"
  //         value={sliderValue}
  //         onChange={sliderChange}
  //         onMouseDown={() => pause()}
  //         onMouseUp={updateTimeStep}
  //         onMouseLeave={updateTimeStep}
  //         aria-labelledby="continuous-slider"
  //       />
  //     </div>
  //   </div>
  // );
}
