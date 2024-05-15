import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import BfitNavbar from "./components/Navbar";
import { BrowserRouter } from "react-router-dom";
// import ContextProvider from "./Context/ContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    {/* <ContextProvider> */}
    <App />
    {/* </ContextProvider> */}
  </BrowserRouter>
);
