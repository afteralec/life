import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Slider from "@material-ui/core/Slider";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import PauseRoundedIcon from "@material-ui/icons/PauseRounded";
import SkipNextRoundedIcon from "@material-ui/icons/SkipNextRounded";
import SkipPreviousRoundedIcon from "@material-ui/icons/SkipPreviousRounded";

export default function ({
  game,
  boardEmpty,
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
    <div>
      <IconButton
        disabled={!!game || boardEmpty}
        onClick={back}
        color="primary"
      >
        <SkipPreviousRoundedIcon fontSize="large" />
      </IconButton>

      {!game ? (
        <IconButton onClick={play} disabled={boardEmpty} color="primary">
          <PlayArrowRoundedIcon fontSize="large" />
        </IconButton>
      ) : (
        <IconButton onClick={pause} disabled={boardEmpty} color="primary">
          <PauseRoundedIcon fontSize="large" />
        </IconButton>
      )}

      <IconButton
        disabled={!!game || boardEmpty}
        onClick={step}
        color="primary"
      >
        <SkipNextRoundedIcon fontSize="large" />
      </IconButton>

      <Slider
        disabled={!!game}
        value={sliderValue}
        onChange={sliderChange}
        onMouseUp={updateTimeStep}
        onMouseLeave={updateTimeStep}
        aria-labelledby="continuous-slider"
      />
    </div>
  );
}
