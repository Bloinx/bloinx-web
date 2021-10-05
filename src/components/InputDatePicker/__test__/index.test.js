import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import moment from "moment";
import MockDate from "mockdate";

import InputDatePicker from "../index";

describe("<InputAmount/>", () => {
  describe("default cases", () => {
    const props = {
      label: "some-label",
      value: new Date(),
      onChange: jest.fn(),
      name: "some-name",
    };

    test("should render correctly using default props", () => {
      render(<InputDatePicker {...props} />);
    });
  });

  describe("common cases", () => {
    const props = {
      label: "some-label",
      value: new Date(),
      onChange: jest.fn(),
      name: "some-name",
    };

    const date = new Date().getTime();
    let dateExpected;

    beforeEach(() => {
      MockDate.set(date);
      dateExpected = moment(date).format("DD MMMM yyyy");
      render(<InputDatePicker {...props} />);
      MockDate.reset();
    });

    test("should render correctly", async () => {
      await (() => expect(screen.getByText("$")).toBeInTheDocument());
    });

    test("should do click to go back option", async () => {
      const input = screen.getAllByRole("textbox");
      expect(input[0].value).toBe(dateExpected);

      await userEvent.click(input[0]);
    });
  });
});
