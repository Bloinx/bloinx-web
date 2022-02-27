import React from "react";
import { render } from "@testing-library/react";

import InputLabel from "../index";

describe("<InputLabel/>", () => {
  describe("default cases", () => {
    test("should render correctly using default props", () => {
      render(<InputLabel />);
    });
  });
});
