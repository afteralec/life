import React from "react";

// Material UI Imports
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// Component to render the Accordion of prebuilt shapes at the top of the UI
export default function ShapesAccordion({
  renderedAccordionShapes,
  drawerOpen,
  setDrawerOpen,
  tour,
  setTourStep
}) {
  const mobile = useMediaQuery("(max-width: 1023px)");

  if (mobile) return <></>;

  return (
    <Accordion
      style={{
        width: "175vh",
        marginBottom: "2vh",
        backgroundColor: "rgba(0, 0, 0, 0)"
      }}
      expanded={drawerOpen}
      onClick={() => {
        setDrawerOpen((drawerOpen) => !drawerOpen);

        // If the tour is active on this component, push the tour forward on step on click
        if (tour) setTourStep((tourStep) => tourStep + 1);
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Shapes</Typography>
      </AccordionSummary>
      <div
        // Render the entire array of renderedAccordionShapes, passed down as
        //   an array of Components
        style={{ display: "flex" }}
      >
        {renderedAccordionShapes}
      </div>
    </Accordion>
  );
}
