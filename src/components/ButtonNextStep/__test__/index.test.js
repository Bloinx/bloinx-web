import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IntlProvider } from "react-intl";

import ButtonNextStep from "../index";

describe("<ButtonNextStep/>", () => {
  const props = {
    onClick: jest.fn(),
    onBack: jest.fn(),
  };

  describe("common cases", () => {
    beforeEach(() => {
      render(
        <IntlProvider
          locale="en"
          onError={(err) => {
            if (err.code === "MISSING_TRANSLATION") {
              return;
            }
            throw err;
          }}
        >
          <ButtonNextStep {...props} />
        </IntlProvider>
      );
    });

    test("should render correctly", async () => {
      await (() =>
        expect(
          screen.getByText("commons.buttons.continue")
        ).toBeInTheDocument());
    });

    test("should do click to go back option", () => {
      userEvent.click(screen.getByText("commons.buttons.back"));
    });
  });

  describe("default cases", () => {
    test("should use the default case to goBack", () => {
      render(
        <IntlProvider
          locale="en"
          onError={(err) => {
            if (err.code === "MISSING_TRANSLATION") {
              return;
            }
            throw err;
          }}
        >
          <ButtonNextStep onClick={jest.fn()} />
        </IntlProvider>
      );
      userEvent.click(screen.getByText("commons.buttons.back"));
    });
  });
});
