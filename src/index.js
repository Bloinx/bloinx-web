import React from "react";
import ReactDOM from "react-dom";
import { Buffer } from "buffer";
import { ThemeProvider } from "@mui/material/styles";

import "./index.css";
import "./i18n";

import App from "./containers/App";
import reportWebVitals from "./reportWebVitals";
import theme from "./theme";

window.Buffer = Buffer;

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
