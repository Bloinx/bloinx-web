import React from "react";
import ReactDOM from "react-dom";
import { Buffer } from "buffer";
import { ThemeProvider } from "@mui/material/styles";

import "./index.css";
import "./i18n";

import App from "./containers/App";
import reportWebVitals from "./reportWebVitals";
import theme from "./theme";

import es from "./locales/es.json";
import en from "./locales/en.json";
import { IntlProvider } from "react-intl";
import flattenMessages from "./utils/locales";

//addLocaleData([...en, ...es])
// eslint-disable-next-line no-undef
const locale = window.navigator.language.split("-")[0];
console.log(locale);
// const defaultLocale = "es";
// const languages = { en, es };
//const messages = languages[locale];
let messages;
if (locale === "en") {
  messages = en;
} else {
  messages = es;
}

window.Buffer = Buffer;
ReactDOM.render(
  <React.StrictMode>
    <IntlProvider
      onError={(err) => {
        if (err.code === "MISSING_TRANSLATION") {
          console.warn("Missing translation", err.message);
          return;
        }
        throw err;
      }}
      messages={flattenMessages(es)}
      locale={locale}
      defaultLocale="es"
    >
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </IntlProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
