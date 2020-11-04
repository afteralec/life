import React, { useState } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default function ({ setDragShape }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Accordion
      style={{
        width: "100%",
        marginBottom: "2vh"
      }}
      expanded={expanded}
      onClick={() => {
        setExpanded((expanded) => !expanded);
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Shapes</Typography>
      </AccordionSummary>
      <AccordionDetails
        draggable={true}
        onDragStart={() => {
          setDragShape("pentomino");
        }}
        onDragEnd={() => {
          setDragShape("");
        }}
      >
        Pentomino
      </AccordionDetails>
    </Accordion>
  );
}
