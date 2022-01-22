import React from "react";
import { IntlProvider } from "react-intl";
import { render } from "@testing-library/react";

import Placeholder from "../index";

describe("<Placeholder/>", () => {
  const messages = {
    "createRound.titleConfirm": "message",
  };
  const locale = "es";
  describe("default cases", () => {
    test("should render correctly using default props", () => {
      render(
        <IntlProvider
          messages={messages}
          locale={locale}
          defaultLocale={locale}
        >
          <Placeholder />
        </IntlProvider>
      );
    });
  });
});
