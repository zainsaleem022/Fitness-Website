import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./components/theme"; // Import your custom theme
import BfitNavbar from "./components/Navbar";
import ExerciseLibrary from "./components/ExerciseLibrary";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BfitNavbar />
      <ExerciseLibrary />
    </ThemeProvider>
  );
};

export default App;
