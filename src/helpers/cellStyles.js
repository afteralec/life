// Helper function to return different cell styles based on its state
export default function cellStyles(hovered, active, wasActive) {
  // If the cell is hovered, return the hovered light grey effect
  if (hovered) {
    return {
      backgroundColor: "#333",
      opacity: "0.5",
      transform: "scale(1)"
    };
  }

  // If a cell is active, return the dark grey + the animation
  if (active) {
    return {
      backgroundColor: "#333",
      animationName: "activeAnimation",
      animationDuration: "750ms",
      animationTimingFunction: "ease-in-out",
      animationDelay: 0,
      animationDirection: "alternate",
      animationIterationCount: 1
    };

    // If a cell was active prior to this, return the red color with the animation
  } else if (wasActive) {
    return {
      backgroundColor: "firebrick",
      transform: "scale(0)",
      animationName: "inactiveAnimation",
      animationDuration: "500ms",
      animationTimingFunction: "ease-in-out",
      animationDelay: 0,
      animationDirection: "alternate",
      animationIterationCount: 1,
      transitionProperty: "background-color transform",
      transitionDuration: "500ms"
    };
  } else {
    return {};
  }
}
