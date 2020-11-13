import React from "react";
import AccordionShape from "./AccordionShape";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default function ({
  drawerOpen,
  setDrawerOpen,
  selectShape,
  dropShape,
  setHoverPoint,
  dragging,
  setDrag
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
      <div style={{ display: "flex" }}>
        <AccordionShape
          rows={3}
          cols={3}
          center={{ row: 1, col: 1 }}
          name="pentomino"
          label="R-Pentomino"
          setExpanded={setDrawerOpen}
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
          setExpanded={setDrawerOpen}
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
          setExpanded={setDrawerOpen}
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
          setExpanded={setDrawerOpen}
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
