import React, { useState, useEffect } from "react";

// Material UI imports
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
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
  setGrid
}) {
  const [sliderValue, setSliderValue] = useState(50),
    [playOnSliderMouseUp, setPlayOnSliderMouseUp] = useState(false);

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

  // Hide this set of controls on mobile
  const mobile = useMediaQuery("(max-width: 1023px)");

  if (mobile) return <></>;

  return (
    <div
      // Top-level wrapper div for the entire control unit
      style={{
        width: "100%",
        ...style
      }}
    >
      <div
        // Wrapper div for the majority of control buttons
        style={{
          display: "flex",
          position: "absolute",
          bottom: "7vh",
          left: "14vh",
          width: "85%"
        }}
      >
        <Button
          // Back button
          disabled={!!playing}
          onClick={back}
          color="primary"
        >
          Back
        </Button>

        <span
          // Wrapper to fade the Play/Pause buttons in and out on the appropriate tour step
          style={{
            animation: tour.play ? "fadeInAndOut 4s linear" : "",
            animationIterationCount: tour.play ? "infinite" : ""
          }}
        >
          <ButtonGroup
            // Button Group for Play and Pause buttons
            variant="contained"
            color="primary"
            aria-label="contained primary button group"
          >
            <Button
              // Play button
              variant="contained"
              disabled={!!playing}
              onClick={handlePlay}
              color="primary"
            >
              <PlayArrowRoundedIcon />
              Play
            </Button>
            <Button
              // Pause button
              variant="contained"
              disabled={!playing}
              onClick={pause}
              color="primary"
            >
              <PauseRoundedIcon />
              Pause
            </Button>
          </ButtonGroup>
        </span>

        <Button
          // Forward button
          disabled={!!playing}
          onClick={step}
          color="primary"
        >
          Forward
        </Button>

        <div
          // Wrapper div for Clear and Random buttons
          style={{
            marginLeft: "13rem"
          }}
        >
          <span
            // Wrapper for the Clear button to highlight during the appropriate tour step
            style={{
              animation: tour.clear ? "fadeInAndOut 4s linear" : "",
              animationIterationCount: tour.clear ? "infinite" : ""
            }}
          >
            <Button
              // Clear button
              onClick={() => {
                clear();

                // If the tour is on the Clear step, push the tour forward one step
                if (tour.clear) setTourStep((tourStep) => tourStep + 1);
              }}
              color="primary"
            >
              <CloseRoundedIcon />
              Clear
            </Button>
          </span>
          <Button
            // Random button
            onClick={() => {
              const newGrid = generateGrid();
              setGrid(seeds.random(newGrid));
            }}
            color="primary"
          >
            <CasinoRoundedIcon />
            Random
          </Button>
        </div>
      </div>

      <div
        // Wrapper div for the speed slider
        style={{
          position: "absolute",
          bottom: "5vh",
          right: "14vh",
          width: "15%"
        }}
      >
        <Typography style={{ display: "inline" }}>Speed: </Typography>
        <Typography
          style={{
            display: "inline"
          }}
        >
          <strong>{renderSpeed(sliderValue)}</strong>
        </Typography>
        <Slider
          // Speed control slider
          color="primary"
          value={sliderValue}
          onChange={sliderChange}
          onMouseDown={() => pause()}
          onMouseUp={updateTimeStep}
          onMouseLeave={updateTimeStep}
          aria-labelledby="continuous-slider"
        />
      </div>
    </div>
  );
}
