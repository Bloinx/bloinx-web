/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import store from "../../../redux/store";
import Login from "../index";

describe("<Login/>", () => {
  test("should render correctly using default props", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  });
});
