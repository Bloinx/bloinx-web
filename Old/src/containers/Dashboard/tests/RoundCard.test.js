/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { IntlProvider } from "react-intl";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";

import { RoundCard } from "../RoundCard";

jest.mock("firebase/auth", () => ({
  getAuth: () => ({ currentUser: "user" }),
}));

describe("<Form/>", () => {
  const messages = {
    "createRound.titleConfirm": "message",
  };
  const locale = "es";
  test("should render correctly using default props", () => {
    const props = {
      name: "",
      contractKey: "",
      groupSize: 3,
      missingPositions: 1,
      turn: 1,
      linkTo: "",
      onClick: jest.fn(),
      buttonText: "",
      positionToWithdrawPay: 2,
      loading: true,
      buttonDisabled: false,
      withdraw: false,
      onWithdraw: jest.fn(),
      stage: "",
      saveAmount: "",
    };
    render(
      <IntlProvider messages={messages} locale={locale} defaultLocale={locale}>
        <BrowserRouter>
          <RoundCard {...props} />
        </BrowserRouter>
      </IntlProvider>
    );
  });

  test("should render correctly using props", () => {
    const props = {
      name: "",
      contractKey: "",
      groupSize: 3,
      missingPositions: 0,
      turn: 1,
      linkTo: "",
      onClick: jest.fn(),
      buttonText: "",
      positionToWithdrawPay: 2,
      loading: true,
      buttonDisabled: false,
      withdraw: false,
      onWithdraw: jest.fn(),
      stage: "ON_ROUND_ACTIVE",
      saveAmount: "",
    };
    render(
      <IntlProvider messages={messages} locale={locale} defaultLocale={locale}>
        <BrowserRouter>
          <RoundCard {...props} />
        </BrowserRouter>
      </IntlProvider>
    );
  });

  test("should render correctly using", () => {
    const props = {
      name: "",
      contractKey: "",
      groupSize: 3,
      missingPositions: 0,
      turn: 1,
      linkTo: "",
      onClick: jest.fn(),
      buttonText: "",
      positionToWithdrawPay: 2,
      loading: false,
      buttonDisabled: false,
      withdraw: false,
      onWithdraw: jest.fn(),
      stage: "other",
      saveAmount: "",
    };
    render(
      <IntlProvider messages={messages} locale={locale} defaultLocale={locale}>
        <BrowserRouter>
          <RoundCard {...props} />
        </BrowserRouter>
      </IntlProvider>
    );
  });
});
