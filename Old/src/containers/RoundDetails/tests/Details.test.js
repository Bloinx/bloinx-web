/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";

import Details from "../Details";

describe("<Details/>", () => {
  const props = {
    roundData: {
      contract: "0x74387E1719Cf1E3C01303a811DC1516e98221B00",
      participantsData: [{ admin: true }],
      invitations: [{}],
      stage: "ON_REGISTER_STAGE",
      positionData: {
        name: "test",
      },
    },
  };

  test("should render correctly using default props", () => {
    render(
      <BrowserRouter>
        <Details roundData={props.roundData} />
      </BrowserRouter>
    );
  });
});
