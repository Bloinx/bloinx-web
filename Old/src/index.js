import React from "react";
import ReactDOM from "react-dom";
import { IntlProvider } from "react-intl";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";

import reportWebVitals from "./reportWebVitals";
import flattenMessages from "./utils/locales";
import store from "./redux/store";
import es from "./locales/es.json";
import en from "./locales/en.json";
import theme from "./theme";
import App from "./App";

import "antd/dist/antd.css";
import "./index.less";

// eslint-disable-next-line no-undef
const locale = window.navigator.language.split("-")[0];
const defaultLocale = "es";

const languages = { en, es };
const messages = languages[locale];

ReactDOM.render(
  <React.StrictMode>
    <IntlProvider
      messages={flattenMessages(messages)}
      locale={locale}
      defaultLocale={defaultLocale}
    >
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <App />
          </Provider>
        </ThemeProvider>
      </BrowserRouter>
    </IntlProvider>
  </React.StrictMode>,
  // eslint-disable-next-line no-undef
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
