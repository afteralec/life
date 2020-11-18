import React from "react";

// Material UI Components
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default function ({
  renderedAccordionShapes,
  drawerOpen,
  setDrawerOpen,
  tour,
  setTourStep
}) {
  return (
    <Accordion
      style={{
        animation: tour ? "fadeInAndOut 4s linear" : "",
        animationIterationCount: tour ? "infinite" : "",
        width: "175vh",
        marginBottom: "2vh",
        backgroundColor: "rgba(0, 0, 0, 0)"
      }}
      expanded={drawerOpen}
      onClick={() => {
        setDrawerOpen((drawerOpen) => !drawerOpen);
        if (tour) setTourStep((tourStep) => tourStep + 1);
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Shapes</Typography>
      </AccordionSummary>
      <div style={{ display: "flex" }}>{renderedAccordionShapes}</div>
    </Accordion>
  );
}
