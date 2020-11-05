import React, { useState } from "react";
import Pentomino from "./shapes/Pentomino";
import Glider from "./shapes/Glider";
import Diehard from "./shapes/Diehard";

import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default function ({ selectShape, dropShape, setHoverPoint }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Accordion
      style={{
        width: "100%",
        marginBottom: "2vh",
        backgroundColor: "rgba(0, 0, 0, 0)"
      }}
      expanded={expanded}
      onClick={() => {
        setExpanded((expanded) => !expanded);
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Shapes</Typography>
      </AccordionSummary>
      <div style={{ display: "flex" }}>
        <AccordionDetails>
          <Pentomino
            selectShape={selectShape}
            dropShape={dropShape}
            setHoverPoint={setHoverPoint}
          />
        </AccordionDetails>
        <AccordionDetails>
          <Glider
            selectShape={selectShape}
            dropShape={dropShape}
            setHoverPoint={setHoverPoint}
          />
        </AccordionDetails>
        <AccordionDetails>
          <Diehard
            selectShape={selectShape}
            dropShape={dropShape}
            setHoverPoint={setHoverPoint}
          />
        </AccordionDetails>
      </div>
    </Accordion>
  );
}
