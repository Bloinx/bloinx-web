import React from "react";
import renderer from "react-test-renderer";

import InputEmailTags from "../index";

describe("InputEmailTags", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <InputEmailTags
          name="some-name"
          value={[]}
          label="some-label"
          placeholder="some-placeholder"
          onChangeValue={jest.fn()}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
