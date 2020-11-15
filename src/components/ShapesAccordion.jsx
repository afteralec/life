import React from "react";

// Material UI Components
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default function ({
  renderedAccordionShapes,
  drawerOpen,
  setDrawerOpen
}) {
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
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Shapes</Typography>
      </AccordionSummary>
      <div style={{ display: "flex" }}>{renderedAccordionShapes}</div>
    </Accordion>
  );
}
