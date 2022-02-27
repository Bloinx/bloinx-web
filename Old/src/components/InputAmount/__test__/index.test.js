import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import InputAmount from "../index";

describe("<InputAmount/>", () => {
  describe("default cases", () => {
    const props = {
      label: "some-label",
      value: 100,
      onChange: jest.fn(),
      name: "some-name",
    };

    test("should render correctly using default props", () => {
      render(<InputAmount {...props} />);
    });
  });

  describe("common cases", () => {
    const props = {
      currency: "USD",
      label: "some-label",
      value: 100,
      onChange: jest.fn(),
      name: "some-name",
    };

    test("should render correctly", async () => {
      render(<InputAmount {...props} />);
      await (() => expect(screen.getByText("$")).toBeInTheDocument());
    });

    test("should do click to go back option", async () => {
      props.value = 0;
      render(<InputAmount {...props} />);

      const input = screen.getByTestId("InputAmount-test");
      expect(input.value).toBe("0");

      await userEvent.paste(input, 99);
      waitFor(() =>
        expect(screen.getByTestId("InputAmount-test").value).toBe(100)
      );
      waitFor(() => expect(props.onChange).toHaveBeenCalledTimes(1));
    });
  });
});
