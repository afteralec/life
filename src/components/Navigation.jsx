import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Slider from "@material-ui/core/Slider";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import FastForwardRoundedIcon from "@material-ui/icons/FastForwardRounded";
import FastRewindRoundedIcon from "@material-ui/icons/FastRewindRounded";
import PauseRoundedIcon from "@material-ui/icons/PauseRounded";
import StopRoundedIcon from "@material-ui/icons/StopRounded";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import WhatshotRoundedIcon from "@material-ui/icons/WhatshotRounded";
import MenuOpenRoundedIcon from "@material-ui/icons/MenuOpenRounded";
import SkipNextRoundedIcon from "@material-ui/icons/SkipNextRounded";
import SkipPreviousRoundedIcon from "@material-ui/icons/SkipPreviousRounded";

export default function ({
  game,
  // playing,
  boardEmpty,
  pause,
  play,
  step,
  clear,
  setTimeStep
}) {
  const [sliderValue, setSliderValue] = useState(50);

  function sliderChange(event, value) {
    setSliderValue(value);
  }

  function updateTimeStep() {
    setTimeStep(1250 - sliderValue * 10);
  }

  return (
    <div>
      {/* <WhatshotRoundedIcon fontSize="large" /> */}

      {/* <IconButton
        onClick={clear}
        disabled={!game && boardEmpty}
        color="secondary"
      >
        {!game ? (
          <ClearRoundedIcon fontSize="large" />
        ) : (
          <StopRoundedIcon fontSize="large" />
        )}
      </IconButton> */}

      <IconButton
        disabled={!!game || boardEmpty}
        onClick={() => {
          console.log("rewind");
        }}
        color="primary"
      >
        <SkipPreviousRoundedIcon fontSize="large" />
      </IconButton>

      <IconButton
        disabled={!!game || boardEmpty}
        onClick={() => {
          console.log("rewind");
        }}
        color="primary"
      >
        <FastRewindRoundedIcon fontSize="large" />
      </IconButton>

      {boardEmpty ? (
        <IconButton onClick={play} color="secondary">
          <WhatshotRoundedIcon fontSize="large" />
        </IconButton>
      ) : !game ? (
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
        <FastForwardRoundedIcon fontSize="large" />
      </IconButton>

      <IconButton
        disabled={!!game || boardEmpty}
        onClick={() => {
          console.log("rewind");
        }}
        color="primary"
      >
        <SkipNextRoundedIcon fontSize="large" />
      </IconButton>

      {/* <IconButton color="primary">
        <MenuOpenRoundedIcon fontSize="large" />
      </IconButton> */}

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
