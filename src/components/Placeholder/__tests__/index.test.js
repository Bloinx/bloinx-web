import React from "react";
import { render } from "@testing-library/react";

import Placeholder from "../index";

describe("<Placeholder/>", () => {
  describe("default cases", () => {
    test("should render correctly using default props", () => {
      render(<Placeholder />);
    });
  });
});
