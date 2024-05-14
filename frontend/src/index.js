import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ResponsiveAppBar from "./components/Navbar";
import ExerciseLibrary from "./pages/ExerciseLibrary";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <>
      <ResponsiveAppBar />
      <ExerciseLibrary />
      {/* <App /> */}
    </>
  );
