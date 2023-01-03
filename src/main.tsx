import React from "react";
import ReactDOM from "react-dom/client";
import DetailMovie from "./pages/DetailMovie";
import Home from "./pages/Home";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);
