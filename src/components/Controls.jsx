import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import Slider from "@material-ui/core/Slider";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import PauseRoundedIcon from "@material-ui/icons/PauseRounded";
import SkipNextRoundedIcon from "@material-ui/icons/SkipNextRounded";
import SkipPreviousRoundedIcon from "@material-ui/icons/SkipPreviousRounded";

export default function ({
  style,
  playing,
  pause,
  play,
  step,
  back,
  setTimeStep
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

  function sliderChange(event, value) {
    event.preventDefault();
    setSliderValue(value);
    pause();

    if (playing) setPlayOnSliderMouseUp(true);
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
        <IconButton disabled={!!playing} onClick={back} color="primary">
          <SkipPreviousRoundedIcon fontSize="large" />
        </IconButton>

        {!playing ? (
          <IconButton onClick={play} color="primary">
            <PlayArrowRoundedIcon fontSize="large" />
          </IconButton>
        ) : (
          <IconButton onClick={pause} color="primary">
            <PauseRoundedIcon fontSize="large" />
          </IconButton>
        )}

        <IconButton disabled={!!playing} onClick={step} color="primary">
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
