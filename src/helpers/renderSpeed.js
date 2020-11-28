// Helper function to render the speed value of the slider control
export default function renderSpeed(sliderValue) {
  const speedValue = (sliderValue / 50).toFixed(1);

  if (speedValue === "0.0") return "slowest";
  if (speedValue === "2.0") return "fastest";

  return speedValue + "x";
}
