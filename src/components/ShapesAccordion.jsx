import React, { useState } from "react";
import AccordionShape from "./AccordionShape";
import Pentomino from "../deprecated/shapes/Pentomino";
import Glider from "../deprecated/shapes/Glider";
import Diehard from "../deprecated/shapes/Diehard";
import Acorn from "../deprecated/shapes/Acorn";

import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default function ({
  selectShape,
  dropShape,
  setHoverPoint,
  dragging,
  setDrag
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Accordion
      style={{
        width: "175vh",
        marginBottom: "2vh",
        backgroundColor: "rgba(0, 0, 0, 0)"
      }}
      expanded={expanded}
      onClick={() => {
        setExpanded((expanded) => !expanded);
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Shapes</Typography>
      </AccordionSummary>
      <div style={{ display: "flex" }}>
        <AccordionShape
          rows={3}
          cols={3}
          center={{ row: 1, col: 1 }}
          name="pentomino"
          label="R-Pentomino"
          setExpanded={setExpanded}
          selectShape={selectShape}
          dropShape={dropShape}
          setHoverPoint={setHoverPoint}
          dragging={dragging}
          setDrag={setDrag}
        />

        <hr />

        <AccordionShape
          rows={3}
          cols={3}
          center={{ row: 1, col: 1 }}
          name="glider"
          label="Glider"
          setExpanded={setExpanded}
          selectShape={selectShape}
          dropShape={dropShape}
          setHoverPoint={setHoverPoint}
          dragging={dragging}
          setDrag={setDrag}
        />

        <hr />

        <AccordionShape
          rows={3}
          cols={8}
          center={{ row: 1, col: 3 }}
          name="diehard"
          label="Diehard"
          setExpanded={setExpanded}
          selectShape={selectShape}
          dropShape={dropShape}
          setHoverPoint={setHoverPoint}
          dragging={dragging}
          setDrag={setDrag}
        />

        <hr />

        <AccordionShape
          rows={3}
          cols={7}
          center={{ row: 1, col: 3 }}
          name="acorn"
          label="Acorn"
          setExpanded={setExpanded}
          selectShape={selectShape}
          dropShape={dropShape}
          setHoverPoint={setHoverPoint}
          dragging={dragging}
          setDrag={setDrag}
        />
      </div>
    </Accordion>
  );
}
