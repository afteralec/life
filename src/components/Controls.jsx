import React, { useState, useEffect } from "react";

// Material UI component imports
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import PauseRoundedIcon from "@material-ui/icons/PauseRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import CasinoRoundedIcon from "@material-ui/icons/Casino";

// App javaScript service file imports
import generateGrid from "../services/generateGrid";
import seeds from "../services/seeds";

export default function ({
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

  useEffect(() => {
    if (playOnSliderMouseUp) {
      play();
      setPlayOnSliderMouseUp(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play]);

  function handlePlay() {
    if (tour.play) {
      setTourStep((tourStep) => tourStep + 1);
      clear();
      return;
    }

    play();
  }

  function sliderChange(event, value) {
    event.preventDefault();
    setSliderValue(value);
    pause();

    if (playing) setPlayOnSliderMouseUp(true);
  }

  function updateTimeStep() {
    setTimeStep(1350 - sliderValue * 10);
    if (tour.slider) setTourStep((tourStep) => tourStep + 1);
  }

  return (
    <div
      style={{
        width: "100%",
        ...style
      }}
    >
      <div
        style={{
          display: "flex",
          position: "absolute",
          bottom: "7vh",
          left: "14vh",
          width: "85%"
        }}
      >
        <Button disabled={!!playing} onClick={back} color="primary">
          Back
        </Button>

        <span
          style={{
            animation: tour.play ? "fadeInAndOut 4s linear" : "",
            animationIterationCount: tour.play ? "infinite" : ""
          }}
        >
          <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="contained primary button group"
          >
            <Button
              variant="contained"
              disabled={!!playing}
              onClick={handlePlay}
              color="primary"
            >
              <PlayArrowRoundedIcon />
              Play
            </Button>
            <Button
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

        <span
          style={{
            animation: tour.backAndStep ? "fadeInAndOut 4s linear" : "",
            animationIterationCount: tour.backAndStep ? "infinite" : ""
          }}
        >
          <Button disabled={!!playing} onClick={step} color="primary">
            Forward
          </Button>
        </span>

        <div
          style={{
            marginLeft: "13rem"
          }}
        >
          <span
            style={{
              animation: tour.clear ? "fadeInAndOut 4s linear" : "",
              animationIterationCount: tour.clear ? "infinite" : ""
            }}
          >
            <Button
              onClick={() => {
                clear();
                if (tour.clear) setTourStep((tourStep) => tourStep + 1);
              }}
              color="primary"
            >
              <CloseRoundedIcon />
              Clear
            </Button>
          </span>
          <Button
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
        style={{
          animation: tour.slider ? "fadeInAndOut 4s linear" : "",
          animationIterationCount: tour.slider ? "infinite" : "",
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

function renderSpeed(sliderValue) {
  const speedValue = (sliderValue / 50).toFixed(1);

  if (speedValue === "0.0") return "slowest";
  if (speedValue === "2.0") return "fastest";

  return speedValue + "x";
}
