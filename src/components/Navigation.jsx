import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

export default function () {
  return (
    <AppBar
      style={{
        backgroundColor: "#333333"
      }}
      position="static"
    >
      <Toolbar
        style={{
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Button
          size="large"
          style={{
            backgroundColor: "steelblue",
            color: "white"
          }}
          variant="fill"
        >
          Play
        </Button>
      </Toolbar>
    </AppBar>
  );
}
