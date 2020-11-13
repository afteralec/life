import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Slider from "@material-ui/core/Slider";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import PauseRoundedIcon from "@material-ui/icons/PauseRounded";
import SkipNextRoundedIcon from "@material-ui/icons/SkipNextRounded";
import SkipPreviousRoundedIcon from "@material-ui/icons/SkipPreviousRounded";

export default function ({
  style,
  game,
  pause,
  play,
  step,
  back,
  setTimeStep
}) {
  const [sliderValue, setSliderValue] = useState(50);

  function sliderChange(event, value) {
    setSliderValue(value);
  }

  function updateTimeStep() {
    setTimeStep(1350 - sliderValue * 10);
  }

  return (
    <div style={{ width: "100%", ...style }}>
      <div
        style={{
          position: "absolute",
          bottom: "7vh",
          left: "14vh",
          width: "85%"
        }}
      >
        <IconButton disabled={!!game} onClick={back} color="primary">
          <SkipPreviousRoundedIcon fontSize="large" />
        </IconButton>

        {!game ? (
          <IconButton onClick={play} color="primary">
            <PlayArrowRoundedIcon fontSize="large" />
          </IconButton>
        ) : (
          <IconButton onClick={pause} color="primary">
            <PauseRoundedIcon fontSize="large" />
          </IconButton>
        )}

        <IconButton disabled={!!game} onClick={step} color="primary">
          <SkipNextRoundedIcon fontSize="large" />
        </IconButton>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "7.25vh",
          right: "14vh",
          width: "15%"
        }}
      >
        <Slider
          disabled={!!game}
          value={sliderValue}
          onChange={sliderChange}
          onMouseUp={updateTimeStep}
          onMouseLeave={updateTimeStep}
          aria-labelledby="continuous-slider"
        />
      </div>
    </div>
  );
}
