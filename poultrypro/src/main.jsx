import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { FarmProvider } from "./context/FarmContext";
import "./app.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <FarmProvider>
    <App />
  </FarmProvider>
);
