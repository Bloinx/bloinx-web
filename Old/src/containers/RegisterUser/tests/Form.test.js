/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { IntlProvider } from "react-intl";
import { render } from "@testing-library/react";

import { Form } from "../Form";

jest.mock("firebase/auth", () => ({
  getAuth: () => ({ currentUser: "user" }),
}));

describe("<Form/>", () => {
  const messages = {
    "createRound.titleConfirm": "message",
  };
  const locale = "es";
  test("should render correctly using default props", () => {
    const onChangeValue = jest.fn();
    const form = {};

    render(
      <IntlProvider messages={messages} locale={locale} defaultLocale={locale}>
        <Form onChangeValue={onChangeValue} form={form} />
      </IntlProvider>
    );
  });
});
