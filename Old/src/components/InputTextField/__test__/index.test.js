import React from 'react';
import renderer from 'react-test-renderer';

import InputTextField from '../index';

describe('InputTextField', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <InputTextField
        name="some-name"
        value="some-value"
        label="some-label"
        onChange={jest.fn()}
        placeholder="some-placeholder"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
