import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const pages = [
  { name: "Home", path: "/" },
  { name: "Workout Tracking", path: "/workoutTracking" },
  { name: "Exercise Library", path: "/exerciseLibrary" },
  { name: "Goal Setting", path: "/goalSetting" },
  { name: "About", path: "/about" },
];

function BfitNavbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        {pages.map((page) => (
          <Button
            key={page.name}
            component={Link}
            to={page.path}
            color="inherit"
          >
            {page.name}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
}

export default BfitNavbar;
