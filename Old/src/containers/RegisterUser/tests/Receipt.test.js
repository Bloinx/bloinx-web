/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";

import Receipt from "../Receipt";

describe("<Receipt/>", () => {
  test("should render correctly using default props", () => {
    render(<Receipt />);
  });
});
