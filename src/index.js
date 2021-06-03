import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { SampleProvider } from "./contexts/SampleContext";

ReactDOM.render(
  <React.StrictMode>
    <SampleProvider>
      <App />
    </SampleProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
