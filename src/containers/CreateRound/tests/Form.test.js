/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { IntlProvider } from "react-intl";
import { BrowserRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Form from "../Form";

describe("<Form/>", () => {
  describe("default cases", () => {
    const props = {
      form: {
        amount: 10,
      },
      onChangeValue: jest.fn(),
    };

    const messages = {};
    const locale = "es";

    test("should render correctly using default props", () => {
      render(
        <IntlProvider
          messages={messages}
          locale={locale}
          defaultLocale={locale}
        >
          <Form {...props} />
        </IntlProvider>
      );
    });

    test("should active the redirection", () => {
      render(
        <IntlProvider
          messages={messages}
          locale={locale}
          defaultLocale={locale}
        >
          <BrowserRouter>
            <Form {...props} />
          </BrowserRouter>
        </IntlProvider>
      );
      userEvent.click(screen.getByText("commons.buttons.continue"));
    });
  });
});
